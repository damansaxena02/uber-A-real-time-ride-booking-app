const express = require('express');
const router = express.Router();
const mapController = require('../controllers/map.controller');
const { body,query } = require('express-validator');
const ridecontroller=require('../controllers/ride.controller')
const authMiddleware= require('../middlewares/auth.middlewares')



router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 5 }).withMessage('Pickup location is required'),
    body('destination').isString().isLength({ min: 5 }).withMessage('Destination is required'),
    body('vehicleType').isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
    ridecontroller.createRide
)


router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('invalid pickup'),
    query('destination').isString().isLength({min:3}).withMessage('invalid destination'),

    ridecontroller.getFare
)
router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('invalid ride id'),
    ridecontroller.confirmRide
)

// router.get('/start-ride',
//     authMiddleware.authCaptain,
//      query('rideId').isMongoId().withMessage('invalid rideid'),
//       query('otp').isString().isLength({min:6,max:6}).withMessage('invalid otp'),
//       ridecontroller.startRide
// )
router.get(
  "/start-ride",
  authMiddleware.authCaptain,
  query("rideId").isString().withMessage("invalid ride id"),
  query("otp").isString().withMessage("invalid otp"),
  ridecontroller.startRide
);


router.post('/end-ride',
      authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('invalid ride id'),
    ridecontroller.endRide
)

// Debug route
router.get('/debug-sockets', ridecontroller.debugSockets)

module.exports = router;