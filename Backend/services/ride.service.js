const ridemodel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');
const captainModel = require('../models/captain.model');
const { sendMessageToSocketId } = require('../socket');

function getOtp(num = 4) {
  return crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num));
}

async function getFare(pickup, destination) {
  if (!pickup || !destination) throw new Error('pickup and destination are required');

  const pickupCoords = await mapService.getAddressCoordinates(pickup);
  const destinationCoords = await mapService.getAddressCoordinates(destination);
  const distanceTime = await mapService.getDistanceAndTime(pickupCoords, destinationCoords);

  const baseFare = { auto: 30, car: 50, moto: 20 };
  const perKmRate = { auto: 10, car: 15, moto: 8 };
  const perMinuteRate = { auto: 2, car: 3, moto: 1.5 };

  return {
    auto: Math.round(baseFare.auto + (distanceTime.distance.value / 1000) * perKmRate.auto + (distanceTime.duration.value / 60) * perMinuteRate.auto),
    car: Math.round(baseFare.car + (distanceTime.distance.value / 1000) * perKmRate.car + (distanceTime.duration.value / 60) * perMinuteRate.car),
    moto: Math.round(baseFare.moto + (distanceTime.distance.value / 1000) * perKmRate.moto + (distanceTime.duration.value / 60) * perMinuteRate.moto),
  };
}

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!user || !pickup || !destination || !vehicleType) throw new Error('All fields are required');

  const fare = await getFare(pickup, destination);

  const ride = await ridemodel.create({
    user,
    pickup,
    destination,
    otp: getOtp(4),
    fare: fare[vehicleType],
  });

  const pickupCoords = await mapService.getAddressCoordinates(pickup);
  const captains = await mapService.getCaptainsInTheRadius(pickupCoords.lat, pickupCoords.lng);

  if (captains && captains.length > 0) {
    const rideWithUser = await ridemodel.findById(ride._id).populate('user');
    console.log(`📢 Notifying ${captains.length} captains...`);

    captains.forEach((captain) => {
      if (captain.socketId) {
        sendMessageToSocketId(captain.socketId, {
          event: 'new-ride',
          data: rideWithUser,
        });
      }
    });
  } else {
    console.warn('⚠️ No captains found in radius');
  }

  return ride;
};

module.exports.getFare = getFare;

// module.exports.confirmRide = async ({ rideId, captain }) => {




//   if (!rideId) throw new Error('Ride id is required');

//   await ridemodel.findByIdAndUpdate(rideId, {
//     status: 'accepted',
//     captain: captain._id,
//   });

//   const ride = await ridemodel
//     .findById(rideId)
//     .populate('user')
//     .populate('captain')
//     .select('+otp');

//   if (!ride) throw new Error('Ride not found');
//   return ride;
// };


module.exports.confirmRide = async ({ rideId, captain }) => {
  try {
    console.log('🟢 confirmRide called with:', { rideId, captain });

    if (!rideId) throw new Error('Ride id is required');

    // ✅ Handle both cases: string or object
    const captainId = typeof captain === 'object' ? captain._id : captain;

    if (!captainId) throw new Error('Captain details missing');

    // ✅ Update the ride
    const updatedRide = await ridemodel.findByIdAndUpdate(
      rideId,
      {
        status: 'accepted',
        captain: captainId,
      },
      { new: true }
    );

    if (!updatedRide) throw new Error('Ride not found');

    // ✅ Populate full details
    const ride = await ridemodel
      .findById(updatedRide._id)
      .populate('user')
      .populate('captain')
      .select('+otp');

    console.log('✅ Ride confirmed successfully:', ride);
    return ride;
  } catch (err) {
    console.error('💥 Error in confirmRide:', err);
    throw err;
  }
};



module.exports.startRide = async ({ rideId, otp, captain }) => {
  console.log('🚀 Starting ride:', { rideId, otp });

  // ✅ Fetch ride with OTP and captain
  const ride = await ridemodel
    .findById(rideId)
    .select('+otp')
    .populate('user')
    .populate('captain'); 

  if (!ride) throw new Error('Ride not found');

  // 1️⃣ Validate OTP
  if (ride.otp !== otp) {
    console.log('❌ Invalid OTP entered:', otp, 'Expected:', ride.otp);
    throw new Error('Invalid OTP');
  }

  // 2️⃣ Validate captain
  if (!ride.captain) {
    throw new Error('Captain not assigned to this ride');
  }
  if (ride.captain._id.toString() !== captain._id.toString()) {
    throw new Error('You are not assigned to this ride');
  }

  // 3️⃣ Update ride status
  ride.status = 'ongoing';
  await ride.save();

  // 4️⃣ Update captain status
  await captainModel.findByIdAndUpdate(captain._id, { status: 'busy' });

  // 5️⃣ Notify user
  if (ride.user?.socketId) {
    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-started',
      data: ride,
    });
  }

  console.log('✅ Ride started successfully');
  return ride;
};

