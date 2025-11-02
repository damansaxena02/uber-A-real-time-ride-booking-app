

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, 'firstname must be at least 3 characters long'],
    },
    lastname: {
      type: String,
      minlength: [3, 'lastname must be at least 3 characters long'],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, 'color must be at least 3 characters long'],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, 'plate must be at least 3 characters long'],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, 'capacity must be at least 1'],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ['car', 'motorcycle', 'auto'],
    },
  },
  // Location will be handled separately to avoid geospatial index issues
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
});

// Note: Geospatial index will be added manually when captains have valid location data

// hash password before save
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// compare password
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generate token
captainSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const captainModel = mongoose.model('Captain', captainSchema);
module.exports = captainModel;
