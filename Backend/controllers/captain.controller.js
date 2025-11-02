
const { validationResult } = require('express-validator');
const captainService = require('../services/captain.service');
const captainModel = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log("REQ BODY ===>", req.body); // debug line
    const { fullname, email, password, vehicle } = req.body;

    console.log("Registration - Password length:", password.length);
    console.log("Registration - Password:", password);

    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
      return res.status(400).json({ message: 'Captain already exists' });
    }

    const captain = await captainService.createCaptain({ fullname, email, password, vehicle });
    console.log("Registration - Captain created with ID:", captain._id);

    const token = captain.generateAuthToken();

    // ✅ Only one response
    return res.status(201).json({
      message: "Captain registered successfully",
      captain,
      token
    });

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

  
module.exports.loginCaptain = async (req, res,next) => {
  try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      
      console.log("Login attempt for email:", email);
      console.log("Password length:", password.length);
      
      const captain = await captainModel.findOne({ email }).select('+password');
      if (!captain) {
        console.log("Captain not found for email:", email);
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      console.log("Captain found:", captain.email);
      console.log("Stored password hash:", captain.password ? "Present" : "Missing");
      console.log("Stored password length:", captain.password ? captain.password.length : 0);
      
      const isMatch = await captain.comparePassword(password);
      console.log("Password match result:", isMatch);
      
      if (!isMatch) {
        console.log("Password comparison failed");
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Set captain status to active when they log in
      captain.status = 'active';
      await captain.save();
      
      const token = captain.generateAuthToken();
      res.cookie('token', token);
      console.log("Login successful for:", email, "Status set to active");
      res.status(200).json({ token, captain });
    } catch (err) {
      console.error("Login error:", err);
      next(err);
    }
};
module.exports.getCaptainprofile = async (req,res,next)=>{
    return res.status(200).json({captain:req.captain})
}

module.exports.logoutCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ]
        
        // Set captain status to inactive when they log out
        if (req.captain) {
            req.captain.status = 'inactive';
            req.captain.socketId = null; // Clear socket ID
            await req.captain.save();
            console.log("Captain logged out and set to inactive:", req.captain._id);
        }
        
        await blacklistTokenModel.create({token})
        res.clearCookie('token')
        return res.status(200).json({message:'logout successfully'})
    } catch (err) {
        console.error("Logout error:", err);
        return res.status(500).json({message: 'Logout failed'});
    }
}