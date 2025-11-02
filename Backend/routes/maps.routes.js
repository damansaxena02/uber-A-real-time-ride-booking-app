const express = require('express');
const router = express.Router();
const mapcontroller = require('../controllers/map.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const {query} = require('express-validator');

router.get('/get-coordinates', 
    query('address').isString().isLength({min:3}),
    authMiddleware.authUser,
    mapcontroller.getCoordinates
);
router.get('/get-distance-time',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    authMiddleware.authUser,
    mapcontroller.getDistanceAndTime
)


router.get('/get-suggestions',
    query('input').isString().isLength({min:3}),
    authMiddleware.authUser,
    mapcontroller.getAutoCompleteSuggestion
);


module.exports = router;

