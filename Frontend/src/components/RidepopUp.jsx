import React from "react";

const RidepopUp = ({
  ride,
  setRidepopuppanel,
  confirmRide
}) => {
  return (
    <div className="relative">
      {/* Close Button */}
      <h5
        className="p-1 text-center absolute top-0 w-[93%]"
        onClick={() => setRidepopuppanel(false)}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5 mt-8 text-center">
        🚖 New Ride Available!
      </h3>

      {/* Ride Info */}
      <div className="flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://i.pinimg.com/736x/be/a3/49/bea3491915571d34a026753f4a872000.jpg"
            alt=""
          />
          <h2 className="text-xl font-medium">
            {ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 km</h5>
      </div>

      {/* Pickup & Destination */}
      <div className="w-full mt-5 border-t border-gray-200">
        <div className="flex items-center gap-5 p-3 border-b border-gray-200">
          <i className="ri-map-pin-fill text-lg"></i>
          <div>
            <h3 className="text-lg font-medium">Pickup</h3>
            <p className="text-base text-gray-600 -mt-1">{ride?.pickup}</p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3 border-b border-gray-200">
          <i className="ri-map-pin-user-line text-lg"></i>
          <div>
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-base text-gray-600 -mt-1">
              {ride?.destination}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 p-3">
          <i className="ri-currency-line text-lg"></i>
          <div>
            <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
            <p className="text-base text-gray-600 -mt-1">Cash</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex w-full items-center justify-between mt-6">
        <button
          onClick={() => {
            console.log("❌ Ignored ride");
            setRidepopuppanel(false);
          }}
          className="bg-gray-200 text-black font-semibold p-3 px-10 rounded-lg"
        >
          Ignore
        </button>

        <button
          onClick={() => {
            console.log("🟢 Confirm button clicked with ride:", ride);
            confirmRide();
          }}
          className="bg-green-700 text-white font-semibold p-3 px-10 rounded-lg"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default RidepopUp;
