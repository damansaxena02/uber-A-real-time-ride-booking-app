
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const axios = require("axios");


module.exports.getCoordinates = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { address } = req.query;
    try {
        const coordinates = await mapService.getAddressCoordinates(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found ' });
    }
};

module.exports.getDistanceAndTime = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { origin, destination } = req.query;
        const distance = await mapService.getDistanceAndTime(origin, destination);
        res.status(200).json(distance);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Distance and time not found' });
    }
};

module.exports.getAutoCompleteSuggestion = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }
        const { input } = req.query;
        const suggestions = await mapService.getAutoCompleteSuggestion(input);
        res.status(200).json(suggestions);
    } catch (error) {
        console.error("Error in autocomplete:", error.message);
        res.status(500).json({ message: 'Failed to fetch suggestions' });
    }
};