const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

router.post("/register", [
  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("firstname must be at least 3 characters long"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6})
    .withMessage("Password must be at least 6 characters long"),
  body("vehicle.color")
    .isLength({ min: 3 })
    .withMessage("color must be at least 3 characters long"),
  body("vehicle.plate")
    .isLength({ min: 3 })
    .withMessage("plate must be at least 3 characters long"),
  body("vehicle.capacity")
    .isInt({ min: 1 })
    .withMessage("capacity must be at least 1"),
  body("vehicle.vehicleType")
    .isIn(['car', 'motorcycle', 'auto'])
    .withMessage("vehicalType must be one of car ,motorcycle,auto"),
],
 captainController.registerCaptain
);


router.post("/login", [
  body("email").isEmail().withMessage("enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
],
 captainController.loginCaptain
);


router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainprofile)
router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain)

module.exports = router;
