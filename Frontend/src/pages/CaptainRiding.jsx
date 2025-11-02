import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState,  } from 'react'
import { Link ,useLocation} from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

    const [FinishRidepanel, setFinishRidepanel] = useState(false)
    const FinishRidepanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride

 useGSAP(function () {
if (FinishRidepanel) {
    gsap.to(FinishRidepanelRef.current, { 
    transform:'translateY(0)'
   })
} else{
    gsap.to(FinishRidepanelRef.current, { 
    transform:'translateY(100%)'
   })
}
 }
,[FinishRidepanel])


  return (
     <div className='h-screen relative flex flex-col justify-end'>
       
        <div className='fixed p-6 top-0 flex items-center justify-between w-full'>
          <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
          <Link to='/home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg font-bold ri-logout-box-r-line"></i></Link>
        </div>
      
        <div className='h-1/5 p-6 flex items-center relative justify-between bg-yellow-400 '
        onClick={()=>{
            setFinishRidepanel(true)
        }}
        >
         <h5 className="p-1 text-center absolute top-0 w-[95%]" onClick={()=>{

      }}><i className="text-3xl text-black-200 ri-arrow-up-wide-line"></i></h5>
        <h4 className='text-xl font-semibold'> 4 km away</h4>
          <button  className=' bg-green-700  text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
     
      </div>
       
       <div  ref={FinishRidepanelRef}  className="fixed h-screen w-full translate-y-full z-10 p-3 py-6   px-3 bg-white pt-12 bottom-0">
        <FinishRide
        ride={rideData}
        setFinishRidepanel={setFinishRidepanel} />
      </div>
        <div className='h-screen fixed z-[-1] w-screen top-0  '>
        
         {/* <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        /> */}
        <LiveTracking/>
        
        </div>
    </div>
  )
}

export default CaptainRiding