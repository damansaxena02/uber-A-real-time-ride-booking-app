
🧠 Introduction

This project is a real-time ride-booking web application inspired by Uber, developed using the MERN stack — MongoDB, Express.js, React.js, and Node.js.

The main goal of this project is to allow users to book rides online, track driver locations in real-time, and complete rides with OTP verification — just like the real Uber app.

This project helps understand how real-time applications, authentication systems, and maps integrations work together in modern web development.


🎯 Objective

To create a full-stack web application for booking and managing rides.

To implement real-time communication between user and driver using Socket.io.

To use Google Maps APIs for navigation and fare calculation.

To understand how to connect frontend and backend using REST APIs.

To apply authentication, authorization, and database management using MERN.  

⚙️ Technologies Used
MongoDB	Stores user, driver, and ride data
Express.js	Backend web framework for handling APIs
React.js	Frontend framework for user interface
Node.js	Server-side JavaScript runtime
Socket.io	Real-time communication (live updates)
JWT	Secure user authentication
Tailwind CSS	Responsive frontend design
Google Maps API	Location and route handling


🧩 System Overview

The application has two main sides:

👤 1. User (Passenger) Side

Users sign up and log in securely.

Select pickup and destination locations.

Choose vehicle type (Auto, Car, Bike).

View estimated fare and driver availability.

Confirm booking and get live updates.

View driver’s live location on map.

Verify ride with OTP when driver arrives.

Get notified when the ride starts and ends.

🚗 2. Captain (Driver) Side

Captains (drivers) log in with their own accounts.

Receive real-time ride requests from nearby users.

Accept or reject rides.

Navigate to user’s location using Google Maps.

Start ride after OTP verification.

End ride and mark it complete.

🔁How It Works (Workflow)

User logs in → sends a ride request with pickup & destination.

Backend calculates fare → using Google Distance Matrix API.

The ride request is sent via Socket.io to all available drivers nearby.

A driver accepts the ride → user gets a ride confirmation instantly.

Real-time tracking starts → driver’s location updates live on user’s map.

Driver arrives, user shares OTP → ride starts.

When the driver ends the ride, both sides get a ride summary and fare details.


💬 Real-Time Communication (Socket.io)

The Socket.io library enables live, instant communication between the user and driver.

Examples:

When a user books a ride → drivers get instant ride requests.

When a driver moves → the user’s screen updates in real-time.

When a ride is confirmed → both parties see updates instantly.

This real-time feature makes the app feel fast and dynamic — like Uber.

🔐 Authentication System

Both users and drivers sign up using JWT (JSON Web Tokens).

After login, the backend gives a token that verifies identity.

Middleware in Express ensures only authenticated users access private routes.

Passwords are securely hashed using bcrypt before saving in MongoDB.

🗺️ Google Maps Integration

The project uses Google Maps Platform APIs:

Geocoding API – Converts address to coordinates (latitude, longitude)

Distance Matrix API – Calculates distance and fare between pickup and destination

Maps Embed API – Displays routes on the app map

Directions API – For showing driving path and estimated time

🧮 Fare Calculation Logic

The fare is calculated based on:

Distance (in kilometers)

Vehicle type (Bike, Auto, Car)

Base fare + per kilometer rate

📬 Conclusion

The Uber MERN App is a complete real-world project demonstrating how modern web technologies can create a real-time ride-booking system.

It combines React for frontend, Node and Express for backend, and MongoDB for database — connected with Socket.io for live updates and Google Maps APIs for navigation.

This project successfully simulates the working of Uber — showing real-time rides, live tracking, OTP-based security, and fare calculation.

## Authentication Flow 

<img width="1536" height="1024" alt="8f29b238-ff69-489a-8da8-b83cf4b32158" src="https://github.com/user-attachments/assets/f9a43c42-8251-4684-abed-51659d1dbc3d" />

## Ride Booking & Matching Flow
<img width="1536" height="1024" alt="a14beb0c-2f28-4498-b0dd-8628c212f45d" src="https://github.com/user-attachments/assets/5d8ae8af-be37-477b-913a-c27ccb7e85c2" />

## Real-Time Tracking Flow
<img width="1536" height="1024" alt="3a2a82f9-7675-4331-9200-9592879dbe35" src="https://github.com/user-attachments/assets/70d1cae8-aa00-42fd-89af-b1853e436ab0" />

## Database ER Diagram

<img width="1536" height="1024" alt="4703d538-e9e1-4102-a879-d9ab91068150" src="https://github.com/user-attachments/assets/5a2e8920-00be-4da5-948e-7f9e89593f0a" />

## ER Diagram

<img width="1536" height="1024" alt="ac1403da-3107-4ea8-b899-144a1bac8878" src="https://github.com/user-attachments/assets/1d0af9cc-8791-44cf-8672-b7903e48eecf" />

 ## Live Demo 

https://github.com/user-attachments/assets/1de0160f-188c-47a0-9ed2-ff338db6cfef


