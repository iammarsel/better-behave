// import React from 'react'
// import { NavLink } from 'react-router-dom';
// function Home() {
//   return (
//     <div>
//       <h1>Welcome To GimmeJob!</h1>
//       <button>
//       <NavLink to="/signin">
//         Sign In
//       </NavLink>
//       </button>
//       <button>
//       <NavLink to="/signup">
//         Sign Up
//       </NavLink>
//       <NavLink to="/starter" className="w-28 h-8 mx-12 inline-block mt-24 text-white rounded-xl">
//         New Interview Practice
//       </NavLink>
//       </button>
//     </div>
//   )
// }
// import React from 'react'
// import { NavLink } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/logo_gimmejob.jpeg";

function Home() {
  return (
    <div style={{ backgroundColor: '#1A244D', minHeight: '100vh', fontStyle:'FECC57', color:'FECC57' }} className="flex flex-col items-center justify-center text-FECC57">
      <img
        src={logo} // Replace with the URL of your logo image
        alt="Logo"
        className="absolute top-5 left-5 w-64" // Adjust the width of the logo as needed
      />
      <h1 className="text-4xl mb-8" style={{ color: '#FECC57' }}>Welcome To GimmeJob!</h1>
      <button style={{ backgroundColor: '#233068', fontStyle:'FECC57', color: '#FECC57' }} className="shadow-xl w-44 rounded-lg px-6 py-2 mb-4 hover:bg-opacity-80 transition duration-200">
        <NavLink to="/signin" >
          <span  style={{ color: '#FECC57' }}>Sign In</span>
        </NavLink>
      </button>
      <button style={{ backgroundColor: '#233068', color: '#FECC57' }} className="shadow-xl w-44  rounded-lg px-6 py-2 mb-4 hover:bg-opacity-80 transition duration-200">
        <NavLink to="/signup">
        <span  style={{ color: '#FECC57' }}>Sign Up</span>
        </NavLink>
      </button>
      {/* <div className="mt-8"> 
        <NavLink to="/starter" style={{ backgroundColor: '#FECC57', color: '#233068' }} className="w-44 h-16 rounded-xl text-center p-4 hover:bg-opacity-80 transition duration-200">
          New Interview Practice
        </NavLink>
      </div> */}
    </div>
  );
}

export default Home;
