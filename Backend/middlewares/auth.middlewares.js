const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklistedTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }


    const isBlacklisted = await blacklistedTokenModel.findOne({ token: token });

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)

        req.user = user;
        req.user_id = user._id;
        return next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

// module.exports.authCaptain = async (req, res, next) => { 
//     const token = req.cookies.token || req.headers.authorization.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
//     const isBlacklisted = await blacklistedTokenModel.findOne({token :token})
//     if(isBlacklisted){
//         return res.status(401).json({ message: "Token has been blacklisted." });
//     }
//     try{
//         const decoded = jwt.verify(token,process.env.JWT_SECRET)
//         const captain = await captainModel.findById(decoded._id)
//         req.captain = captain;
//         return next()
//     }catch(err){
//         return res.status(401).json({ message: "Invalid token." });
//     }
// }
module.exports.authCaptain = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // Continue with token verification here
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.captainId = decoded.id;
    next();

  } catch (err) {
    console.error("❌ authCaptain error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
