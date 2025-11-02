import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidepopUp from "../components/RidepopUp";
import ConfirmRidepopUp from "../components/ConfirmRidepopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainHome = () => {
  const [Ridepopuppanel, setRidepopuppanel] = useState(false);
  const [ConfirmRidepopUppanel, setConfirmRidepopUppanel] = useState(false);
  const [ride, setRide] = useState(null);

  const RidepopuppanelRef = useRef(null);
  const ConfirmRidepopUppanelRef = useRef(null);

  const { socket, isConnected } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  // 🟢 Join socket room and update location
  useEffect(() => {
    if (!socket || !captain?._id || !isConnected) {
      console.log('⏳ Waiting for socket connection...', { socket: !!socket, captain: !!captain?._id, isConnected });
      return;
    }

    console.log("📡 Captain joining socket room:", captain._id);

    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        console.log("📍 Requesting location permission...");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            console.log("📍 Location obtained:", location);
            socket.emit("update-location-captain", {
              userId: captain._id,
              location: location,
            });
          },
          (error) => {
            console.log("⚠️ Location access denied or timeout. Captain will still receive ride requests.");
            // Still emit to update status to active, even without location
            socket.emit("update-location-captain", {
              userId: captain._id,
              location: null, // No location data
            });
          },
          {
            enableHighAccuracy: false, // Less strict
            timeout: 5000, // Shorter timeout
            maximumAge: 60000 // Allow cached location for 1 minute
          }
        );
      } else {
        console.log("⚠️ Geolocation not supported. Captain will still receive ride requests.");
        // Still emit to update status to active, even without location
        socket.emit("update-location-captain", {
          userId: captain._id,
          location: null, // No location data
        });
      }
    };

    updateLocation();
    const locationInterval = setInterval(updateLocation, 30000); // Update every 30 seconds instead of 10

    return () => clearInterval(locationInterval);
  }, [socket, captain, isConnected]);

  // 🟢 Listen for new ride event
  useEffect(() => {
    if (!socket || !isConnected) {
      console.log("❌ No socket connection available or not connected");
      return;
    }

    console.log("🎧 Setting up 'new-ride' event listener...");

    const handleNewRide = (data) => {
      console.log("🚖 New ride received:", data);
      setRide(data);
      setRidepopuppanel(true);
    };

    // Add error handling for socket events
    const handleSocketError = (error) => {
      console.error("❌ Socket error:", error);
    };

    socket.on("new-ride", handleNewRide);
    socket.on("error", handleSocketError);
    socket.on("test-response", (data) => {
      console.log("✅ Socket test response:", data);
    });

    // Test socket connection
    socket.emit("test-connection", { message: "Captain connected" });

    return () => {
      console.log("🧹 Cleaning up socket listeners");
      socket.off("new-ride", handleNewRide);
      socket.off("error", handleSocketError);
    };
  }, [socket, isConnected]);

  // 🧪 DEMO: Test ride request button
  const testRideRequest = () => {
    const demoRide = {
      _id: 'demo-ride-123',
      pickup: 'Demo Pickup Location',
      destination: 'Demo Destination',
      user: {
        fullname: { firstname: 'Demo', lastname: 'User' }
      },
      fare: 150,
      distance: '5.2 km',
      duration: '12 mins',
      vehicleType: 'car'
    };
    console.log("🧪 DEMO: Simulating ride request");
    setRide(demoRide);
    setRidepopuppanel(true);
  };

  // 🟢 Confirm Ride
  const confirmRide = async () => {
    if (!ride?._id) {
      alert("Wait! Ride details not received yet.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride._id,
          captain: { _id: captain._id },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("✅ Ride confirmed:", response.data);
      setRidepopuppanel(false);

      // Slight delay for smooth animation
      setTimeout(() => {
        setConfirmRidepopUppanel(true);
      }, 300);
    } catch (err) {
      console.error("🚨 Ride confirmation failed:", err);
    }
  };

  // 🟢 GSAP Animations
  useGSAP(
    () => {
      gsap.to(RidepopuppanelRef.current, {
        transform: Ridepopuppanel ? "translateY(0)" : "translateY(100%)",
        duration: 0.5,
        ease: "power3.out",
      });
    },
    [Ridepopuppanel]
  );

  useGSAP(
    () => {
      gsap.to(ConfirmRidepopUppanelRef.current, {
        transform: ConfirmRidepopUppanel ? "translateY(0)" : "translateY(100%)",
        duration: 0.5,
        ease: "power3.out",
      });
    },
    [ConfirmRidepopUppanel]
  );

  return (
    <div className="h-screen">
      {/* Header */}
      <div className="fixed p-6 top-0 flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <img
            className="w-16"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber"
          />
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </div>
        </div>
        <Link
          to="/home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-bold ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* Map / Image Section */}
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      {/* Captain Details */}
      <div className="h-2/5 p-6">
        <CaptainDetails />
        
        {/* DEMO: Test Button */}
        <div className="mt-4">
          <button
            onClick={testRideRequest}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            🧪 DEMO: Test Ride Request
          </button>
        </div>
      </div>

      {/* Ride Popup */}
      <div
        ref={RidepopuppanelRef}
        className="fixed w-full translate-y-full z-10 p-3 py-6 px-3 bg-white pt-12 bottom-0"
      >
        <RidepopUp
          ride={ride}
          setRidepopuppanel={setRidepopuppanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* Confirm Ride Popup */}
      <div
        ref={ConfirmRidepopUppanelRef}
        className="fixed h-screen w-full translate-y-full z-10 p-3 py-6 px-3 bg-white pt-12 bottom-0"
      >
        <ConfirmRidepopUp
          ride={ride}
          setConfirmRidepopUppanel={setConfirmRidepopUppanel}
          setRidepopuppanel={setRidepopuppanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
