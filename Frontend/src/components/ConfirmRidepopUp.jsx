import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmRidepopUp = ({ ride, setConfirmRidepopUppanel, setRidepopuppanel }) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!ride || !ride._id) {
      alert("⏳ Ride details not available yet!");
      return;
    }
     const token = localStorage.getItem("token");

    console.log("📤 Sending OTP confirmation:", {
      rideId: ride._id,
      otp,
      token,
    });

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: {
          rideId: ride._id,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("📤 Sending OTP request:", {
  url: `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
  rideId: ride._id,
  otp,
});
            console.log("✅ Ride started:", response.data);

      if (response.status === 200) {
           alert("✅ Ride started successfully!");
        setConfirmRidepopUppanel(false);
        setRidepopuppanel(false);
        navigate("/captain-riding", { state: { ride: response.data } });
      }
    } catch (error) {
      console.error("🚨 OTP confirmation failed:", error.response?.data || error);
      alert(error.response?.data?.message ||"OTP confirmation failed! Please try again.");
    }
  };

  if (!ride) return null; // 🚫 Do not render if ride is null

  return (
    <div>
      <h5
        className="p-1 text-center absolute top-0 w-[93%]"
        onClick={() => {
          setRidepopuppanel(false);
          setConfirmRidepopUppanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">Confirm this ride to start</h3>

      <div className="flex items-center justify-between mt-4 p-2 bg-yellow-400 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://i.pinimg.com/736x/be/a3/49/bea3491915571d34a026753f4a872000.jpg"
            alt="User"
          />
          <h2 className="text-xl font-medium capitalize">
            {ride.user.fullname.firstname} {ride.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibol">2.2km</h5>
      </div>

      <div className="flex flex-col gap-2 items-center mt-5 w-full">
        <div className="flex items-center gap-5 p-3 border-b-1">
          <i className="text-lg ri-map-pin-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Pickup</h3>
            <p className="text-base text-gray-600 -mt-1">{ride.pickup}</p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3 border-b-1">
          <i className="ri-map-pin-user-line"></i>
          <div>
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-base text-gray-600 -mt-1">{ride.destination}</p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3">
          <i className="ri-currency-line"></i>
          <div>
            <h3 className="text-lg font-medium">₹{ride.fare}</h3>
            <p className="text-base text-gray-600 -mt-1">Cash</p>
          </div>
        </div>

        {/* OTP Form */}
        <form onSubmit={submitHandler} className="mt-5 w-full">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="bg-[#eee] px-6 py-4 text-lg font-mono rounded-lg w-full"
            type="text"
            placeholder="Enter OTP"
            required
          />
          <button
            type="submit"
            
            className="mt-5 w-full text-lg bg-green-700 text-white font-semibold p-3 rounded-lg"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={() => {
              setRidepopuppanel(false);
              setConfirmRidepopUppanel(false);
            }}
            className="mt-2 w-full bg-red-500 text-lg text-white font-semibold p-3 rounded-lg"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmRidepopUp;
