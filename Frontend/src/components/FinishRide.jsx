import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
                                                      
import axios from 'axios'

const FinishRide = (props) => {

  const navigate = useNavigate()
   async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

            rideId: props.ride._id


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            navigate('/captain-home')
        }

    }

  
  return (
     <div >
         <h5 className="p-1 text-center absolute top-0 w-[93%]" onClick={()=>{
   props.setFinishRidepanel(false)
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
      <h3  className="text-2xl font-semibold mb-5"> Finish this ride</h3>
      
      <div className='flex items-center justify-between mt-4 p-4 border-2 border-yellow-400 rounded-lg' >
        <div className='flex items-center gap-3 '>
            <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/736x/be/a3/49/bea3491915571d34a026753f4a872000.jpg" alt="" />
            <h2 className='text-xl font-medium'>{props.ride?.user.fullname.firstname}</h2>
        </div>
        <h5 className='text-lg font-semibol'>2.2km</h5>
      </div>

      <div className='flex  gap-2 justify-between flex-col items-center'>
             <div className='w-full mt-5'>
<div className='items-center flex gap-5 p-3 border-b-1'>
  <i className=" text-lg ri-map-pin-fill"></i>
  <div className=''>
    <h3 className='text-lg font-medium'>562/11-A</h3>
    <p className='text-base text-gray-600 -mt-1'>{props.ride?.pickup}</p>
  </div>
</div>
<div className='items-center flex gap-5 p-3 border-b-1'>
<i className="ri-map-pin-user-line"></i>
  <div className=''>
    <h3 className='text-lg font-medium'>562/11-A</h3>
    <p className='text-base text-gray-600 -mt-1'>{props.ride?.destination}</p>
  </div>
</div>
<div className='items-center flex gap-5 p-3'>
<i className="ri-currency-line"></i>  <div className=''>
    <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
    <p className='text-base text-gray-600 -mt-1'>Cash Cash</p>
  </div>
</div>
        </div>
        
    <div className='mt-6 w-full'>
     
      
            <button  onClick={endRide}

    className='mt-10 w-full flex justify-center text-lg bg-green-700  text-white font-semibold p-3 rounded-lg'>Finish Ride</button>
    <p className=' mt-10  '>Click on finish ride if you have completed the payment. </p>



    </div>
      </div>
    </div>
  )
}

export default FinishRide