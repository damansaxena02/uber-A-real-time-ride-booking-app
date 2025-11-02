
import React from 'react';

const LocationSearchPanel = ({
  suggestions,
  setVehiclePanelopen,
  setpenalopen,
  setPickup,
  setDestination,
  activeField,
  setactiveField
}) => {

  const handleSuggestionClick = (item) => {
    // item.description contains the readable address
    if (activeField === 'pickup') {
      setPickup(item.description);
    } else if (activeField === 'destination') {
      setDestination(item.description);
    }

    // Close search panel & open vehicle panel
    // setpenalopen(false);
    // setVehiclePanelopen(true);
  };

  return (
    <div className='p-4'>
      {suggestions && suggestions.length > 0 ? (
        suggestions.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(item)}
            className='flex gap-4 border-2 p-3 border-gray-100 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer'
          >
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className='font-medium'>{item.description}</h4>
          </div>
        ))
      ) : (
        <p className='text-center text-gray-500 mt-3'>No suggestions yet...</p>
      )}
    </div>
  );
};

export default LocationSearchPanel;
