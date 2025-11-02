import { createContext, useContext, useState } from 'react';

 export const CaptainDataContext = createContext();

export const CaptainContext= ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isloading, setisLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCaptain = (captainData)=>{
        setCaptain(captainData)

    };



    const value = {
        captain,
        setCaptain,
        isloading,
        error,
        setisLoading,
        setError,
        updateCaptain
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};
export default CaptainContext