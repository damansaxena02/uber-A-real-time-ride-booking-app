// Test script to verify captain authentication
// Run this after setting up your .env files

const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testCaptainAuth() {
  try {
    console.log('Testing Captain Authentication...\n');
    
    // Test data - using timestamp to make email unique
    const timestamp = Date.now();
    const testCaptain = {
      fullname: {
        firstname: 'Test',
        lastname: 'Captain'
      },
      email: `testcaptain${timestamp}@example.com`,
      password: 'testpassword123',
      vehicle: {
        color: 'Red',
        plate: `ABC${timestamp}`,
        capacity: 4,
        vehicleType: 'car'
      }
    };

    // Step 1: Register a captain
    console.log('1. Registering captain...');
    const registerResponse = await axios.post(`${BASE_URL}/captains/register`, testCaptain);
    console.log('✅ Registration successful:', registerResponse.data.message);
    console.log('Token:', registerResponse.data.token ? 'Generated' : 'Not generated');
    
    // Step 2: Login with the same credentials
    console.log('\n2. Logging in...');
    const loginResponse = await axios.post(`${BASE_URL}/captains/login`, {
      email: testCaptain.email,
      password: testCaptain.password
    });
    console.log('✅ Login successful:', loginResponse.data.token ? 'Token received' : 'No token');
    
    // Step 3: Test profile access
    console.log('\n3. Testing profile access...');
    const profileResponse = await axios.get(`${BASE_URL}/captains/profile`, {
      headers: {
        'Authorization': `Bearer ${loginResponse.data.token}`
      }
    });
    console.log('✅ Profile access successful:', profileResponse.data.captain.email);
    
    console.log('\n🎉 All tests passed! Captain authentication is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data?.message || error.message);
    console.error('Full error:', error.response?.data || error.message);
  }
}

// Run the test
testCaptainAuth();
