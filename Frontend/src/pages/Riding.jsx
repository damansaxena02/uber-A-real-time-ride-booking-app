import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import { useEffect,useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding=()=> {

  const location = useLocation()
  const {ride} = location.state ||{}
  const {socket}=useContext(SocketContext)
  const navigate=useNavigate()

socket.on("ride-ended"),()=>{
  navigate('/home')
}


  return (
    <div className='h-screen'>
        <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg font-bold ri-home-4-line"></i></Link>
        <div className='h-1/2 '> 
        
        {/* <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        /> */}
        
        <LiveTracking/>
        </div>
        <div className='h-1/2 p-4'>
         <div className='flex items-center justify-between'>
                <img className="h-25" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
       <div className='text-right'>
        <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
        <h4 className='text-xl font-semibold -mt-1 -md-1'>{ride?.captain.vehicle.plate}</h4>
        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
       </div>
       </div>
      <div className='flex  gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
<div className='items-center flex gap-5 p-3 border-b-1'>
  <i className=" text-lg ri-map-pin-fill"></i>
  <div className=''>
    <h3 className='text-lg font-medium'>562/11-A</h3>
    <p className='text-base text-gray-600 -mt-1'>{ride?.destination}</p>
  </div>
</div>

<div className='items-center flex gap-5 p-3'>
<i className="ri-currency-line"></i>  <div className=''>
    <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
    <p className='text-base text-gray-600 -mt-1'>Cash Cash</p>
  </div>
</div>
        </div>
   

        <button  className='mt-5 w-full bg-green-700  text-white font-semibold p-2 rounded-lg'>Make a Payment</button></div>
      </div>
    </div>
  )
}

export default Riding