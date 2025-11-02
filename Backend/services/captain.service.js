
const captainModel = require('../models/captain.model');

module.exports.createCaptain = async function ({ fullname, email, password, vehicle }) {
  if (
    !fullname?.firstname ||
    !email ||
    !password ||
    !vehicle?.color ||
    !vehicle?.plate ||
    !vehicle?.capacity ||
    !vehicle?.vehicleType
  ) {
    throw new Error('All fields are required');
  }

  // hash password
  console.log("Service - Original password:", password);
  console.log("Service - Password length:", password.length);
  const hashedPassword = await captainModel.hashPassword(password);
  console.log("Service - Hashed password length:", hashedPassword.length);
  console.log("Service - Hashed password starts with:", hashedPassword.substring(0, 10));

  const captain = await captainModel.create({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    password: hashedPassword,
    vehicle: {
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    },
  });

  return captain;
};
