import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainSignup = () => {
const navigate= useNavigate()

  
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userData, setuserData] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler =async (e) => {
    e.preventDefault();
    const CaptainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle:{
        color:vehicleColor,
        plate:vehiclePlate,
        capacity:vehicleCapacity,
        vehicleType:vehicleType
      }
    };
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,CaptainData)
  if (response.status===201) {
    const data = response.data
   setCaptain(data.captain)
   localStorage.setItem('token',data.token)
   navigate('/captain-home')
  }

 
    setemail("");
    setpassword("");
    setfirstName("");
    setlastName("");
    setVehicleColor("");
    setVehicleCapacity("")
    setVehiclePlate("")
    setVehicleType("")


  };
  return (
    <div>
      <div className="py-5 px-5 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-20 mb-8 "
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
            alt=""
          />

          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-lg font-medium  mb-2 ">
              What's our Captain's name
            </h3>
            <div className="flex gap-4 mb-5">
              <input
                type="text"
                className="bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                required
                placeholder="First name"
                value={firstName}
                onChange={(e) => {
                  setfirstName(e.target.value);
                }}
              />{" "}
              <input
                className="bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                type="text "
                required
                placeholder="Last name"
                value={lastName}
                onChange={(e) => {
                  setlastName(e.target.value);
                }}
              />
            </div>
            <h3 className="text-lg font-medium  mb-2 ">
              What's our Captain's email
            </h3>
            <input
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              required
              placeholder="email@example.com"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <h3 className="text-lg font-medium mb-2 ">Enter password</h3>
            <input
              className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="password"
              required
              placeholder="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
            <div className="flex gap-4 mb-5">
              <input
                type="text"
                className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                required
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
              />
              <input
                type="text"
                className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                required
                placeholder="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
              />
            </div>
            <div className="flex gap-4 mb-5">
              <input
                type="number"
                className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                required
                placeholder="Vehicle Capacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
              />
              <select
                className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="" disabled>
                  Select Vehicle Type
                </option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>
            <button className="bg-[#111] text-white mb-7 py-2 px-4 font-semibold w-full text-lg placeholder:text-base rounded">
              Create Captain Account
            </button>
          </form>
          <p className="text-center">
            Already have a account?{" "}
            <Link to={"/captainlogin"} className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[11px] leading-tight">
            By proceesing, you consent to get calls, whatsapp or sms message,
            including by automate d means, from uber and its affiliates to the
            number provided.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
