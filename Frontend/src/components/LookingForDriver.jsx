import React from 'react'

const LookingForDriver = (props) => {
  return (
  <div>
       <h5 className="p-1 text-center absolute top-0 w-[93%]" onClick={()=>{
   props.setVehicleFound(false)
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
      <h3  className="text-2xl font-semibold mb-5">Looking for a Driver</h3>
      <div className='flex  gap-2 justify-between flex-col items-center'>
        <img className="h-30" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
        <div className='w-full mt-5'>
<div className='items-center flex gap-5 p-3 border-b-1'>
  <i className=" text-lg ri-map-pin-fill"></i>
  <div className=''>
    <h3 className='text-lg font-medium'>562/11-A</h3>
    <p className='text-base text-gray-600 -mt-1'>{props.pickup}</p>
  </div>
</div>
<div className='items-center flex gap-5 p-3 border-b-1'>
<i className="ri-map-pin-user-line"></i>
  <div className=''>
    <h3 className='text-lg font-medium'>562/11-A</h3>
    <p className='text-base text-gray-600 -mt-1'>{props.destination}</p>
  </div>
</div>
<div className='items-center flex gap-5 p-3'>
<i className="ri-currency-line"></i>  <div className=''>
    <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
    <p className='text-base text-gray-600 -mt-1'>Cash Cash</p>
  </div>
</div>
        </div>
      </div>
    </div>
  )
}

export default LookingForDriver