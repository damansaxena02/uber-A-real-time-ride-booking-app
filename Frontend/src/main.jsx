// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import {BrowserRouter} from "react-router-dom";
// import UserContext from './context/userContext.jsx';
// import CaptainContext from './context/CaptainContext.jsx';
// import SocketProvider from './context/SocketContext.jsx';

// createRoot(document.getElementById('root')).render(
 
//   <CaptainContext>
//         <UserContext>
//         <SocketProvider>
//           <BrowserRouter>
//             <App />
//           </BrowserRouter>
//     </SocketProvider>
//         </UserContext>
//       </CaptainContext>
 
// );


import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './context/userContext.jsx';
import CaptainProvider from './context/CaptainContext.jsx';
import SocketProvider from './context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SocketProvider>
      <CaptainProvider>
        <UserProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserProvider>
      </CaptainProvider>
    </SocketProvider>
  </React.StrictMode>
);

