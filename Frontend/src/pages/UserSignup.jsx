import React, { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { UserDataContext} from '../context/userContext'

const UserSignup = () => {

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [userData, setuserData] = useState('')
  

  const navigate = useNavigate()

  const {user, setuser} =  React.useContext( UserDataContext)

const submitHandler = async(e)=>{
  e.preventDefault()
   const newUser={
    fullname:{
      firstname:firstName,
      lastname:lastName
    },
    email:email,
    password:password
  }

  const  response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)

   if(response.status===201){
    const data = response.data

    setuser(data.user)
   localStorage.setItem('token',data.token)
    navigate('/home')
   }


  setemail('')
  setpassword('')
  setfirstName('')
  setlastName('')
}

  return (
    <div>
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
          <h3 className="text-lg font-medium  mb-2 ">What's your name</h3>
          <div className='flex gap-4 mb-5'>
                 <input
            type="text"
            className="bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
            required
            placeholder="First name"
            value={firstName}
            onChange={(e)=>{
              setfirstName(e.target.value)
            }}
          />     <input
            className="bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
            type="text "
            required
            placeholder="Last name"
              value={lastName}
            onChange={(e)=>{
              setlastName(e.target.value)
            }}
          />
          </div>
          <h3 className="text-lg font-medium  mb-2 ">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            required
            placeholder="email@example.com"
              value={email}
            onChange={(e)=>{
              setemail(e.target.value)
            }}
          />
          <h3 className="text-lg font-medium mb-2 ">Enter password</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
           
            required
            placeholder="password"
              value={password}
            onChange={(e)=>{
              setpassword(e.target.value)
            }}
          />
          <button className="bg-[#111] text-white mb-7 py-2 px-4 font-semibold w-full text-lg placeholder:text-base rounded">
            Create account
          </button>
        </form>
        <p className="text-center">
           Already have a account?{" "}
          <Link to={"/login"} className="text-blue-600">
          Login here
          </Link>
        </p>
      </div>
      <div>
      
       <p className='text-[11px] leading-tight'>
        By proceesing, you consent to get calls, whatsapp or sms 
        message, including by automate d means, from uber and 
        its affiliates to the number provided.
       </p>
      </div>
    </div>
    </div>
  )
}

export default UserSignup