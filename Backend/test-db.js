// Test database query
const mongoose = require('mongoose');
const captainModel = require('./models/captain.model');
const dotenv = require('dotenv');

dotenv.config();

async function testDatabaseQuery() {
  try {
    // Connect to database
    await mongoose.connect(process.env.DB_CONNECT);
    console.log('Connected to database');
    
    // Find the most recent captain
    const captains = await captainModel.find().sort({ _id: -1 }).limit(1);
    
    if (captains.length > 0) {
      const captain = captains[0];
      console.log('Latest captain email:', captain.email);
      console.log('Captain ID:', captain._id);
      
      // Get captain with password
      const captainWithPassword = await captainModel.findById(captain._id).select('+password');
      console.log('Password field present:', !!captainWithPassword.password);
      console.log('Password length:', captainWithPassword.password ? captainWithPassword.password.length : 0);
      console.log('Password starts with:', captainWithPassword.password ? captainWithPassword.password.substring(0, 10) : 'N/A');
      
      // Test password comparison
      const testPassword = 'testpassword123';
      const isMatch = await captainWithPassword.comparePassword(testPassword);
      console.log('Password match with testpassword123:', isMatch);
      
    } else {
      console.log('No captains found in database');
    }
    
  } catch (error) {
    console.error('Database test error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database');
  }
}

testDatabaseQuery();
