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

// export default Home;
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/logo_gimmejob.jpeg";

function Home() {
  return (
    <div>
      <img
        src={logo} // Replace with the URL of your logo image
        alt="Logo"
        style={{
          position: 'absolute',
          top: '20px', // Adjust the top position as needed
          left: '20px', // Adjust the left position as needed
          width: '250px', // Adjust the width of the logo as needed
        }}
      />
      <h1>Welcome To GimmeJob!</h1>
      <button>
        <NavLink to="/signin">Sign In</NavLink>
      </button>
      <button>
        <NavLink to="/signup">Sign Up</NavLink>
      </button>
      <div className="mt-4"> 
        <NavLink to="/starter" className="w-36 h-10 bg-blue-500 text-white rounded-xl text-center p-2">
          New Interview Practice
        </NavLink>
      </div>
    </div>
  );
}

export default Home;

