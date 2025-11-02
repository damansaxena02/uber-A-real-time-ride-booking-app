// import React from 'react'

// const WaitingForDriver = (props) => {
//   return (
//       <div>
//        <h5 className="p-1 text-center absolute top-0 w-[93%]" onClick={()=>{
//    props.setWaitingForDriver(false)
//       }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
//        <div className='flex items-center justify-between'>
//                 <img className="h-25" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
//        <div className='text-right'>
//         <h2 className='text-lg font-medium'>{props.ride?.captain.fullname.firstname}</h2>
//         <h4 className='text-xl font-semibold -mt-1 -md-1'>{props.ride?.captain.vehivle.plate}</h4>
//         <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
//         <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
//        </div>
//        </div>
//       <div className='flex  gap-2 justify-between flex-col items-center'>
//         <div className='w-full mt-5'>
// <div className='items-center flex gap-5 p-3 border-b-1'>
//   <i className=" text-lg ri-map-pin-fill"></i>
//   <div className=''>
//     <h3 className='text-lg font-medium'>{props.ride?.pickup}</h3>
//     <p className='text-base text-gray-600 -mt-1'>{props.ride?.destination}</p>
//   </div>
// </div>

// <div className='items-center flex gap-5 p-3'>
// <i className="ri-currency-line"></i>  <div className=''>
//     <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
//     <p className='text-base text-gray-600 -mt-1'>Cash Cash</p>
//   </div>
// </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WaitingForDriver


import React from "react";

const WaitingForDriver = (props) => {
  console.log("ride data in WaitingForDriver:", props.ride); // 👀 Debug log

  return (
    <div className="relative bg-white p-3 rounded-2xl shadow-md">
      {/* 🔽 Close Button */}
      <h5
        className="p-1 text-center absolute top-0 w-[93%]"
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      {/* 🚗 Driver Info */}
      <div className="flex items-center justify-between mt-8">
        <img
          className="h-24"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt="Uber logo"
        />

        <div className="text-right">
          <h2 className="text-lg font-medium">
            {props.ride?.captain?.fullname?.firstname ||
              "Finding your driver..."}
          </h2>
          <h4 className="text-xl font-semibold -mt-1">
            {props.ride?.captain?.vehicle?.plate || "Loading vehicle..."}
          </h4>
          <p className="text-sm text-gray-600">
            {props.ride?.captain?.vehicle?.model || "Maruti Suzuki Alto"}
          </p>
          <h1 className="text-lg font-semibold">
            {props.ride?.otp || "----"}
          </h1>
        </div>
      </div>

      {/* 📍 Ride Details */}
      <div className="flex flex-col gap-2 items-center justify-between mt-5">
        <div className="w-full">
          <div className="items-center flex gap-5 p-3 border-b border-gray-200">
            <i className="text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {props.ride?.pickup || "Loading pickup..."}
              </h3>
              <p className="text-base text-gray-600 -mt-1">
                {props.ride?.destination || ""}
              </p>
            </div>
          </div>

          <div className="items-center flex gap-5 p-3">
            <i className="ri-currency-line text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">
                ₹{props.ride?.fare || "..."}
              </h3>
              <p className="text-base text-gray-600 -mt-1">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
