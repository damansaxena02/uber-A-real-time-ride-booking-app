// const rideService = require("../services/ride.service");
// const { validationResult } = require("express-validator");
// const mapService = require("../services/maps.service");
// const { sendMessageToSocketId } = require("../socket");
// const rideModel = require("../models/ride.model");

// module.exports.createRide = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     console.log("❌ Validation errors:", errors.array());
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { pickup, destination, vehicleType } = req.body;
//   console.log("✅ Creating ride with:", {
//     user: req.user_id,
//     pickup,
//     destination,
//     vehicleType,
//   });

//   try {
//     const ride = await rideService.createRide({
//       user: req.user_id,
//       pickup,
//       destination,
//       vehicleType,
//     });

//     // --- Do NOT send response yet ---
//     const pickupCoordinates = await mapService.getAddressCoordinates(pickup);

//     const captainInRadius = await mapService.getCaptainsInTheRadius(
//       pickupCoordinates.lat,
//       pickupCoordinates.lng,
//       2
//     );

//     ride.otp = "";

//     const rideWithUser = await rideModel
//       .findOne({ _id: ride._id })
//       .populate("user");

//     // Send notifications (fire-and-forget)
//     captainInRadius.forEach((captain) => {
//       console.log("📤 Sending new ride to:", captain.socketId);
//       sendMessageToSocketId(captain.socketId, "new-ride", rideWithUser);
//     });

//     // ✅ Send response once, after all done
//     return res.status(200).json(rideWithUser);

//   } catch (error) {
//     // ✅ Only one response possible
//     return res.status(500).json({ message: error.message });
//   }
// };


// module.exports.getFare = async (req, res) => {
//   const error = validationResult(req);
//   if (!error.isEmpty()) {
//     console.log("❌ Validation errors in getFare:", error.array());
//     return res.status(400).json({ errors: error.array() });
//   }

//   const { pickup, destination } = req.query;
//   console.log("📍 Getting fare for:", { pickup, destination });

//   try {
//     const fare = await rideService.getFare(pickup, destination);
//     console.log("✅ Fare calculated:", fare);
//     return res.status(200).json(fare);
//   } catch (error) {
//     console.error("❌ Error calculating fare:", error.message);
//     return res.status(500).json({ message: error.message });
//   }
// };

// module.exports.confirmRide = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const { rideId } = req.body;
//   try {
//     const ride = await rideService.confirmRide({
//       rideId,
//       captain: req.captain,
//     });

//     sendMessageToSocketId(ride.user.socketId, {
//       event: "ride-confirmed",
//       data: ride,
//     });
//     return res.status(200).json(ride);
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };
// module.exports.startRide = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const { rideId, otp } = req.query;
//   try {
//     const ride = await rideService.startRide({
//       rideId,
//       otp,
//       captain: req.captain,
//     });

//     sendMessageToSocketId(ride.user.socketId, {
//       event: "ride-confirmed",
//       data: ride,
//     });
//     return res.status(200).json(ride);
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };
// module.exports.endRide = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const { rideId } = req.body;
//   try {
//     const ride = await rideService.endRide({ rideId, captain: req.captain });

//     sendMessageToSocketId(ride.user.socketId, {
//       event: "ride-ended",
//       data: ride,
//     });
//     return res.status(200).json(ride);
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };


const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId, getActiveSockets } = require("../socket");
const rideModel = require("../models/ride.model");
const captainModel = require("../models/captain.model");

/**
 * 🟢 Create a new ride request (User side)
 */
module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("❌ Validation errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;
  console.log("✅ Creating ride with:", {
    user: req.user_id,
    pickup,
    destination,
    vehicleType,
  });

  try {
    const ride = await rideService.createRide({
      user: req.user_id,
      pickup,
      destination,
      vehicleType,
    });

    // DEMO MODE: Send to ALL active captains (bypass location requirements)
    console.log("🎬 DEMO MODE: Sending ride request to ALL active captains");
    
    const allActiveCaptains = await captainModel.find({
      status: 'active',
      socketId: { $exists: true, $ne: null }
    });
    
    console.log(`🔍 Found ${allActiveCaptains.length} active captains for demo`);

    ride.otp = "";

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    // DEMO MODE: Add some demo data for better presentation
    const demoRideData = {
      ...rideWithUser.toObject(),
      fare: 150, // Demo fare
      distance: "5.2 km", // Demo distance
      duration: "12 mins", // Demo duration
      vehicleType: vehicleType || "car"
    };

    // Debug: Check active socket connections
    const activeSockets = getActiveSockets();
    console.log("🔍 Active socket connections:", activeSockets);

    // 🔥 DEMO MODE: Notify ALL active captains
    console.log(`📢 DEMO MODE: Notifying ${allActiveCaptains.length} active captains...`);
    allActiveCaptains.forEach((captain) => {
      console.log("📤 Sending 'new-ride' event to:", captain.socketId);
      console.log("🔍 Captain socket exists in active connections:", activeSockets.includes(captain.socketId));
      sendMessageToSocketId(captain.socketId, { event: "new-ride", data: demoRideData });
    });

    // ✅ Respond to the user once
    return res.status(200).json(rideWithUser);
  } catch (error) {
    console.error("❌ Error creating ride:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * 🟢 Get fare estimate (User side)
 */
module.exports.getFare = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    console.log("❌ Validation errors in getFare:", error.array());
    return res.status(400).json({ errors: error.array() });
  }

  const { pickup, destination } = req.query;
  console.log("📍 Getting fare for:", { pickup, destination });

  try {
    const fare = await rideService.getFare(pickup, destination);
    console.log("✅ Fare calculated:", fare);
    return res.status(200).json(fare);
  } catch (error) {
    console.error("❌ Error calculating fare:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * 🟢 Captain confirms ride
 */
module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide({
      rideId,
      captain: req.captain,
    });

    // ✅ Notify user that captain confirmed the ride
    sendMessageToSocketId(ride.user.socketId, { event: "ride-confirmed", data: ride });

    return res.status(200).json(ride);
  } catch (err) {
    console.error("❌ Error confirming ride:", err.message);
    return res.status(500).json({ message: err.message });
  }
};



/**
 * 🟢 Start ride after OTP verification
 */
module.exports.startRide = async (req, res) => {

    console.log("📩 Incoming startRide request:", req.query);
    console.log("🚀 Received Start Ride Request:", req.query);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("❌ Validation errors in startRide:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;

  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.captain,
    });

    // ✅ Notify user that ride has started
    sendMessageToSocketId(ride.user.socketId, { event: "ride-started", data: ride });
    console.log("✅ Ride successfully started:", ride._id);
    return res.status(200).json(ride);
  } catch (err) {
    console.error("❌ Error starting ride:", err.message);
    return res.status(500).json({ message: err.message });
  }
};

/**
 * 🟢 End ride and calculate final fare
 */
module.exports.endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.endRide({
      rideId,
      captain: req.captain,
    });

    // ✅ Notify user that ride has ended
    sendMessageToSocketId(ride.user.socketId, { event: "ride-ended", data: ride });

    return res.status(200).json(ride);
  } catch (err) {
    console.error("❌ Error ending ride:", err.message);
    return res.status(500).json({ message: err.message });
  }
};

/**
 * 🧪 Debug endpoint to test socket connections
 */
module.exports.debugSockets = async (req, res) => {
  try {
    const activeSockets = getActiveSockets();
    const captains = await captainModel.find({ 
      status: 'active',
      socketId: { $exists: true, $ne: null }
    });

    const captainSocketStatus = captains.map(captain => ({
      id: captain._id,
      socketId: captain.socketId,
      isActive: activeSockets.includes(captain.socketId),
      hasLocation: !!(captain.latitude && captain.longitude)
    }));

    res.json({
      activeSockets,
      captains: captainSocketStatus,
      totalActiveSockets: activeSockets.length,
      totalCaptains: captains.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
