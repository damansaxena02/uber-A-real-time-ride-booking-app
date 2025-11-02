import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';


const Captainlogin = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState("");
      const [loading, setLoading] = useState(false);

      const{captain,setCaptain}= React.useContext(CaptainDataContext)
      const navigate = useNavigate()
    
    
      const submitHandler= async(e)=>{
       e.preventDefault()
       setError("")
       setLoading(true)
       
       try {
         const captain={
           email:email,
           password
          }
        
          const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captain)
             if (response.status===200) {
               const data = response.data
               setCaptain(data.captain)
               localStorage.setItem('token',data.token)
               navigate('/captain-home')
               
             }
           setEmail("")
           setPassword("")
       } catch (err) {
         console.error("Login error:", err)
         if (err.response && err.response.data && err.response.data.message) {
           setError(err.response.data.message)
         } else {
           setError("Login failed. Please check your credentials and try again.")
         }
       } finally {
         setLoading(false)
       }
      }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-3 "
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
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
          <button 
            type="submit"
            disabled={loading}
            className={`${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#111]'} text-white mb-7 py-2 px-4 font-semibold w-full text-lg placeholder:text-base rounded`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center">
          Join a fleet?{" "}
          <Link to={"/captainsignup"} className="text-blue-600">
          Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link 
        to={'/login'}
        className="bg-[#d5622d] flex items-center justify-center text-white py-2 mb-7 px-4 font-semibold w-full text-lg placeholder:text-base rounded">
          Sign in as user
        </Link>
      </div>
    </div>
  )
}

export default Captainlogin