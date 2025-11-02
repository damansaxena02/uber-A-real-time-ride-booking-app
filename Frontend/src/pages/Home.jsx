
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import Vehiclepanel from "../components/Vehiclepanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import {SocketContext} from '../context/SocketContext'
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
import LocationSearchPanel from "../components/LocationSearchpanel";

function Home() {
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [penalopen, setpenalopen] = useState(false);
  const paanelref = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRiderPanelRef = useRef(null);
  const panalCloseRef = useRef(null);
  const VehicleFoundRef = useRef(null);
  const WaitingForDriverRef = useRef(null);

  const [vehiclePanelopen, setVehiclePanelopen] = useState(false);
  const [confirmRidePanel, setconfirmRidePanel] = useState(false);
  const [VehicleFound, setVehicleFound] = useState(false);
  const [WaitingForDriveropen, setWaitingForDriveropen] = useState(false);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setactiveField] = useState(null);
  const [fare, setfare] = useState({});
  const [vehicleType, setvehicleType] = useState(null);
  const [ ride, setRide ] = useState(null)
const navigate = useNavigate()
 const { socket } = useContext(SocketContext)
  
  const { user } = useContext(UserDataContext)

  //   useEffect(() => {
  //   if (!user) return; // <-- prevent running if user is null
  //   socket.emit("join", { userType: "user", userId: user._id });
    
  //   socket.on('ride-confirmed', ride => {
      
      
  //     setVehicleFound(false)
  //     setWaitingForDriveropen(true)
  //     setRide(ride)
  //   })
    
  //   socket.on('ride-started', ride => {
  //     console.log("ride")
  //     setWaitingForDriveropen(false)
  //     navigate('/riding', { state: { ride } }) 
  //   })
    
  // }, [user]);




  useEffect(() => {
  if (!user) return; // prevent running if user is null

  // Join event
  socket.emit("join", { userType: "user", userId: user._id });

  // Ride confirmed listener
  const rideConfirmedHandler = (ride) => {
    setVehicleFound(false);
    setWaitingForDriveropen(true);
    setRide(ride);
  };
  socket.on("ride-confirmed", rideConfirmedHandler);

  // Ride started listener
  const rideStartedHandler = (ride) => {
    console.log("🚗 Ride started:", ride);
    setWaitingForDriveropen(false);
    navigate("/riding", { state: { ride } });
  };
  socket.on("ride-started", rideStartedHandler);

  // Cleanup on unmount or when user changes
  return () => {
    socket.off("ride-confirmed", rideConfirmedHandler);
    socket.off("ride-started", rideStartedHandler);
  };
}, [user]);



  const handlePickupChange = async (e) => {
  const value = e.target.value;
  setpickup(value);

  if (!value.trim()) {
    setPickupSuggestions([]);
    return;
  }

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
      {
        params: { input: value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setPickupSuggestions(response.data);
    console.log("Pickup suggestions:", response.data);
  } catch (error) {
    console.error("Pickup suggestion error:", error.message);
    console.log("Pickup input:", e.target.value);


  }
};


  const handleDestinationChange = async (e) => {
    setdestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  // ✅ Animate penal panel
  useGSAP(() => {
    if (!paanelref.current || !panalCloseRef.current) return;
    if (penalopen) {
      gsap.to(paanelref.current, { height: "70%", padding: 20 });
      gsap.to(panalCloseRef.current, { opacity: 1 });
    } else {
      gsap.to(paanelref.current, { height: "0%", padding: 0 });
      gsap.to(panalCloseRef.current, { opacity: 0 });
    }
  }, [penalopen]);

  // ✅ Vehicle panel
  useGSAP(() => {
    if (!vehiclePanelRef.current) return;
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanelopen ? "translateY(0)" : "translateY(100%)",
    });
  }, [vehiclePanelopen]);

  // ✅ Confirm ride panel
  useGSAP(() => {
    if (!confirmRiderPanelRef.current) return;
    gsap.to(confirmRiderPanelRef.current, {
      transform: confirmRidePanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [confirmRidePanel]);

  // ✅ Vehicle found panel
  useGSAP(() => {
    if (!VehicleFoundRef.current) return;
    gsap.to(VehicleFoundRef.current, {
      transform: VehicleFound ? "translateY(0)" : "translateY(100%)",
    });
  }, [VehicleFound]);

  // ✅ Waiting for driver panel
  useGSAP(() => {
    if (!WaitingForDriverRef.current) return;
    gsap.to(WaitingForDriverRef.current, {
      transform: WaitingForDriveropen ? "translateY(0)" : "translateY(100%)",
    });
  }, [WaitingForDriveropen]);


async function findTrip() {
  // Trim spaces to avoid empty strings
  const trimmedPickup = pickup?.trim();
  const trimmedDestination = destination?.trim();

  console.log("Finding trip with:", { pickup: trimmedPickup, destination: trimmedDestination });

  if (!trimmedPickup || trimmedPickup.length < 3) {
    alert("Please enter a valid pickup location (at least 3 characters)!");
    return;
  }

  if (!trimmedDestination || trimmedDestination.length < 3) {
    alert("Please enter a valid destination (at least 3 characters)!");
    return;
  }

  try {
    setVehiclePanelopen(true);
    setpenalopen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup: trimmedPickup, destination: trimmedDestination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("✅ Fare Response:", response.data);
    setfare(response.data);
  } catch (error) {
    console.error("❌ Error fetching fare:", error.response?.data || error.message);
    alert(`Failed to fetch fare: ${error.response?.data?.message || error.message}`);
    setVehiclePanelopen(false);
  }
}




async function createRide(vehicleType) {
  const trimmedPickup = pickup?.trim();
  const trimmedDestination = destination?.trim();
  
  console.log("Creating ride with:", { 
    pickup: trimmedPickup, 
    destination: trimmedDestination, 
    vehicleType,
    pickupLength: trimmedPickup?.length,
    destinationLength: trimmedDestination?.length
  });

  if (!trimmedPickup || trimmedPickup.length < 5) {
    alert("Pickup location must be at least 5 characters!");
    return;
  }

  if (!trimmedDestination || trimmedDestination.length < 5) {
    alert("Destination must be at least 5 characters!");
    return;
  }

  if (!vehicleType || !['car', 'auto', 'moto'].includes(vehicleType)) {
    alert("Please select a valid vehicle type!");
    return;
  }

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup: trimmedPickup,
        destination: trimmedDestination,
        vehicleType
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    console.log("✅ Ride created successfully:", res.data);
  } catch (err) {
    console.error("❌ Error creating ride:", err.response?.data || err.message);
    alert(`Failed to create ride: ${err.response?.data?.message || err.message}`);
  }
}



  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-18 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />

      <div className="h-screen w-screen">
        {/* <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        /> */}
        <LiveTracking/>
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panalCloseRef}
            onClick={() => setpenalopen(false)}
            className="opacity-0 absolute right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[35%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() =>{setpenalopen(true)
                    setactiveField("pickup"); 
              }}
              onChange={handlePickupChange}
              value={pickup}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick up location"
            />
            <input
              onClick={() =>{ setpenalopen(true)
                      setactiveField("destination");

              }}

              onChange={handleDestinationChange}
              value={destination}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white w-full py-3 rounded-lg mt-5 font-semibold"
          >
            Find Trip
          </button>
        </div>

        <div ref={paanelref} className="h-0 bg-white">
  <LocationSearchPanel
  suggestions={activeField === "pickup" ? pickupSuggestions : destinationSuggestions}
  setPickup={setpickup}
  setDestination={setdestination}
  activeField={activeField}
  setactiveField={setactiveField}
  setpenalopen={setpenalopen}
/>



        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 p-3 py-10 translate-y-full px-3 bg-white pt-12 bottom-0"
      >
        <Vehiclepanel
        setvehicleType={setvehicleType}
          fare={fare}
            createRide={createRide} 
          setconfirmRidePanel={setconfirmRidePanel}
          setVehiclePanelopen={setVehiclePanelopen}
        />
      </div>

      <div
        ref={confirmRiderPanelRef}
        className="fixed w-full z-10 p-3 py-6 translate-y-full px-3 bg-white pt-12 bottom-0"
      >
        <ConfirmedRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
  
       
          setconfirmRidePanel={setconfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={VehicleFoundRef}
        className="fixed w-full z-10 p-3 py-6 translate-y-full px-3 bg-white pt-12 bottom-0"
      >
        <LookingForDriver 
        createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
        setVehicleFound={setVehicleFound} />
      </div>

      <div
        ref={WaitingForDriverRef}
        className="fixed w-full z-10 p-3 py-6 px-3 bg-white pt-12 bottom-0"
      >
        <WaitingForDriver
          setWaitingForDriver={setWaitingForDriveropen}
          WaitingForDriver={WaitingForDriver}
          ride={ride}
          setVehicleFound={setVehicleFound}
        />
      </div>
    </div>
  );
}

export default Home;
