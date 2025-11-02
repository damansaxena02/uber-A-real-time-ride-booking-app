const http = require('http')
 const app = require('./app')
 const port = process.env.PORT
 const mongoose = require('mongoose')
const { initializeSocket } = require('./socket');


 const server = http.createServer(app)



  // Initialize Socket.IO
  initializeSocket(server);


 server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
 })