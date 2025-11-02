const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`✅ Socket connected: ${socket.id}`);

    // Join user or captain room
    socket.on('join', async ({ userId, userType }) => {
      try {
        if (userType === 'user') {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
          socket.join(`user-${userId}`);
        } else if (userType === 'captain') {
          const updatedCaptain = await captainModel.findByIdAndUpdate(
            userId, 
            { 
              socketId: socket.id,
              status: 'active' // DEMO MODE: Always mark as active
            },
            { new: true }
          );
          socket.join(`captain-${userId}`);
          socket.join('captains'); // Join general captains room
          console.log(`📝 DEMO MODE: Updated captain ${userId} with socket ID: ${socket.id} and status: active`);
        }
        console.log(`🟢 ${userType} joined with socket ID: ${socket.id}, userId: ${userId}`);
        console.log(`🔍 Socket rooms:`, Array.from(socket.rooms));
      } catch (err) {
        console.error('❌ Error in join:', err.message);
      }
    });

    // Update captain's live location
    socket.on('update-location-captain', async ({ userId, location }) => {
      console.log(`📍 Received location update for captain ${userId}:`, location);
      
      try {
        const updateData = {
          status: 'active' // Ensure captain is active when updating location
        };

        // DEMO MODE: Always set captain as active, location optional
        if (location && location.lat && location.lng) {
          updateData.latitude = location.lat;
          updateData.longitude = location.lng;
          console.log(`📍 Location coordinates updated for captain ${userId}: ${location.lat}, ${location.lng}`);
        } else {
          // DEMO MODE: Still mark as active even without location
          console.log(`🎬 DEMO MODE: Captain ${userId} marked as active (no location required)`);
        }

        const updatedCaptain = await captainModel.findByIdAndUpdate(
          userId, 
          updateData,
          { new: true }
        );
        
        if (updatedCaptain) {
          console.log(`✅ Captain ${userId} updated:`, {
            status: updatedCaptain.status,
            hasLocation: !!updatedCaptain.location?.coordinates
          });
        } else {
          console.error(`❌ Captain ${userId} not found`);
        }
      } catch (err) {
        console.error('❌ Error updating captain:', err.message);
      }
    });

    // Test connection handler
    socket.on('test-connection', (data) => {
      console.log(`🧪 Test connection received from ${socket.id}:`, data);
      socket.emit('test-response', { message: 'Connection working!', timestamp: new Date() });
    });

    socket.on('disconnect', async () => {
      console.log(`❌ Disconnected: ${socket.id}`);
      
      // Clear socket ID from captain when they disconnect
      try {
        await captainModel.updateOne(
          { socketId: socket.id },
          { $unset: { socketId: 1 } }
        );
        console.log(`🧹 Cleared socket ID for disconnected captain: ${socket.id}`);
      } catch (err) {
        console.error('❌ Error clearing socket ID:', err.message);
      }
    });
  });
}

// ✅ Correct helper
const sendMessageToSocketId = (socketId, { event, data }) => {
  if (!io) {
    console.error('❌ Socket.io not initialized');
    return;
  }
  
  if (!socketId) {
    console.error('❌ No socketId provided for sending message');
    return;
  }
  
  console.log(`📨 Sending "${event}" to socket ${socketId}`, data ? 'with data' : 'without data');
  
  // Check if socket exists
  const socketExists = io.sockets.sockets.has(socketId);
  console.log(`🔍 Socket ${socketId} exists:`, socketExists);
  
  if (!socketExists) {
    console.error(`❌ Socket ${socketId} not found in active connections`);
    return;
  }
  
  io.to(socketId).emit(event, data);
  console.log(`✅ Event "${event}" sent successfully to ${socketId}`);
};

// Debug function to get active socket connections
const getActiveSockets = () => {
  if (!io) return [];
  return Array.from(io.sockets.sockets.keys());
};

module.exports = { initializeSocket, sendMessageToSocketId, getActiveSockets };
