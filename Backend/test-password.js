// Direct password test
const bcrypt = require('bcrypt');

async function testPasswordHashing() {
  const password = 'testpassword123';
  
  console.log('Original password:', password);
  console.log('Password length:', password.length);
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hashedPassword);
  console.log('Hashed password length:', hashedPassword.length);
  
  // Compare the password
  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log('Password match:', isMatch);
  
  // Test with wrong password
  const wrongPassword = 'wrongpassword';
  const isWrongMatch = await bcrypt.compare(wrongPassword, hashedPassword);
  console.log('Wrong password match:', isWrongMatch);
}

testPasswordHashing();
