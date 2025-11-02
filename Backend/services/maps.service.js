
const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinates = async (address) => {
  if (!address || address.trim().length < 3) {
    console.warn("⚠️ Address too short, using default coordinates");
    return { lat: 28.6139, lng: 77.2090 }; // Default: New Delhi
  }

  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: { address: address.trim(), key: API_KEY },
    });

    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      console.log(`✅ Coordinates found for "${address}":`, { lat: location.lat, lng: location.lng });
      return { lat: location.lat, lng: location.lng };
    } else {
      console.warn(`⚠️ Geocoding ZERO_RESULTS for: "${address}", using default coordinates`);
      return { lat: 28.6139, lng: 77.2090 }; // Default: New Delhi
    }
  } catch (err) {
    console.error(`❌ Error fetching coordinates for "${address}":`, err.message);
    console.warn("⚠️ Using default coordinates as fallback");
    return { lat: 28.6139, lng: 77.2090 }; // Default: New Delhi
  }
};

module.exports.getDistanceAndTime = async (origin, destination) => {
  if (!origin || !destination) {
    console.warn("⚠️ Missing origin/destination, using default distance/time");
    return {
      distance: { value: 5000, text: '5 km' },
      duration: { value: 600, text: '10 mins' },
      status: 'OK'
    };
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = 'https://maps.googleapis.com/maps/api/distancematrix/json';

  const formatLocation = (loc) =>
    typeof loc === 'object' ? `${loc.lat},${loc.lng}` : loc;

  try {
    const response = await axios.get(url, {
      params: {
        origins: formatLocation(origin),
        destinations: formatLocation(destination),
        key: apiKey,
        units: 'metric',
      },
    });

    const element = response.data.rows[0].elements[0];
    if (element.status !== 'OK') {
      console.warn(`⚠️ Distance Matrix returned: ${element.status}, using default values`);
      return {
        distance: { value: 5000, text: '5 km' },
        duration: { value: 600, text: '10 mins' },
        status: 'OK'
      };
    }

    console.log("✅ Distance and time calculated:", element);
    return element;
  } catch (err) {
    console.error("❌ Error fetching distance/time:", err.message);
    console.warn("⚠️ Using default distance/time as fallback");
    return {
      distance: { value: 5000, text: '5 km' },
      duration: { value: 600, text: '10 mins' },
      status: 'OK'
    };
  }
};

module.exports.getAutoCompleteSuggestion = async (input) => {
  if (!input || input.trim().length < 3) return [];

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

  try {
    const response = await axios.get(url, {
      params: { input: input.trim(), key: apiKey, types: 'geocode' },
    });

    if (response.data.status === 'OK') {
      return response.data.predictions.map((item) => ({
        description: item.description,
        place_id: item.place_id,
      }));
    } else if (response.data.status === 'ZERO_RESULTS') {
      // No suggestions found - this is not an error
      return [];
    } else {
      // Actual API error (e.g., INVALID_REQUEST, REQUEST_DENIED)
      console.error("Google API error:", response.data.status, response.data.error_message || '');
      return [];
    }
  } catch (err) {
    console.error("Error fetching suggestions:", err.message);
    return [];
  }
};

// Helper function to calculate distance between two points
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

module.exports.getCaptainsInTheRadius = async (lat, lng, radiusKm = 2) => {
  try {
    console.log(`🔍 Searching for captains near lat: ${lat}, lng: ${lng}, radius: ${radiusKm}km`);
    
    // First get all active captains with socket connections and location data
    const allCaptains = await captainModel.find({
      status: 'active',
      socketId: { $exists: true, $ne: null },
      latitude: { $exists: true, $ne: null },
      longitude: { $exists: true, $ne: null }
    });
    
    // Filter captains within radius using manual distance calculation
    const captainsInRadius = allCaptains.filter(captain => {
      if (!captain.latitude || !captain.longitude) {
        return false;
      }
      
      const distance = calculateDistance(lat, lng, captain.latitude, captain.longitude);
      return distance <= radiusKm;
    });
    
    console.log(`📍 Found ${captainsInRadius.length} captains in radius:`, captainsInRadius.map(c => ({ 
      id: c._id, 
      socketId: c.socketId, 
      latitude: c.latitude,
      longitude: c.longitude
    })));
    
    return captainsInRadius;
  } catch (err) {
    console.error("Error fetching captains:", err.message);
    return [];
  }
};

