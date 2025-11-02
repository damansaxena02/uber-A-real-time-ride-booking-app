import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserDataContext} from '../context/userContext'
import { useNavigate } from "react-router-dom";
import axios from "axios";


const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [UserData, setUserData] = useState("")

  
  const {user,setuser}=useContext(UserDataContext)
  const navigate = useNavigate()


  const submitHandler= async(e)=>{
   e.preventDefault()
 
   const userData={
    email:email,
    password:password
   }
   
   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)


   if (response.status===200) {
      const data = response.data
      setuser(data.user)
      localStorage.setItem('token',(data.token))
      navigate('/home')
   }
    setEmail("")
    setPassword("")
   
  }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-8 "
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />

        <form onSubmit={(e)=>{
        submitHandler(e)
        }}>
          <h3 className="text-lg font-medium  mb-2 ">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }
            }
            required
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2 ">Enter password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            value={password}
            onChange={(e)=>{
             setPassword(e.target.value)
            }}
            required
            placeholder="password"
          />
          <button className="bg-[#111] text-white mb-7 py-2 px-4 font-semibold w-full text-lg placeholder:text-base rounded">
            Login
          </button>
        </form>
        <p className="text-center">
          New here?{" "}
          <Link to={"/signup"} className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link 
        to={'/captainlogin'}
        className="bg-[#10b461] flex items-center justify-center text-white py-2 mb-7 px-4 font-semibold w-full text-lg placeholder:text-base rounded">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
