import React from 'react'

const Vehiclepanel = (props) => {
  return (
    <div>  <h5 className="p-1 text-center absolute top-0 w-[93%]" onClick={()=>{
   props.setVehiclePanelopen(false)
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <h3  className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
        <div onClick={()=>{
            props.setconfirmRidePanel(true)
            props.setvehicleType('car')
              props.createRide('car');
            
        }} className="flex w-full mb-2 border-2 border-white active:border-black rounded-xl p-3 items-center  justify-between">
          <img className="h-20" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div className="w-1/2 ">
            <h4 className="font-medium text-base">UberGo <span><i className="ri-user-fill"></i>4</span></h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-sm text-gray-600">Affortable, compact rides</p>
          </div>
          <h2 className="text-2xl font-semibold">₹{props.fare.car}</h2>
        </div>
           <div onClick={()=>{
            props.setconfirmRidePanel(true)
             props.setvehicleType('moto')
               props.createRide('moto')
            
        }} className="flex w-full  mb-2  border-2 border-white active:border-black rounded-xl p-3 items-center  justify-between">
          <img className="h-20" src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n" alt="" />
          <div className="w-1/2 ">
            <h4 className="font-medium text-base">Moto <span><i className="ri-user-fill"></i>1</span></h4>
            <h5 className="font-medium text-sm">3 mins away</h5>
            <p className="font-normal text-sm text-gray-600">Affortable, motorcycle rides</p>
          </div>
          <h2 className="text-2xl font-semibold">₹{props.fare.moto}</h2>
        </div>
        <div onClick={()=>{
            props.setconfirmRidePanel(true)
             props.setvehicleType('auto')
               props.createRide('auto');
            
        }} className="flex w-full  mb-2  border-2 border-white active:border-black rounded-xl p-3 items-center  justify-between">
          <img className="h-20" src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n" alt="" />
          <div className="w-1/2 ">
            <h4 className="font-medium text-base">UberAuto <span><i className="ri-user-fill"></i>3</span></h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-sm text-gray-600">Affortable, Auto rides</p>
          </div>
          <h2 className="text-2xl font-semibold">₹{props.fare.auto}</h2>
        </div></div>
  )
}

export default Vehiclepanel