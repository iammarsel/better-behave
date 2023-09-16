import React from 'react'
import { NavLink } from 'react-router-dom';
function Home() {
  return (
    <div>
      <h1>Welcome To GimmeJob!</h1>
      <button>
      <NavLink to="/signin">
        Sign In
      </NavLink>
      </button>
      <button>
      <NavLink to="/signup">
        Sign Up
      </NavLink>
      <NavLink to="/starter" className="w-28 h-8 mx-12 inline-block mt-24 text-white rounded-xl">
        New Interview Practice
      </NavLink>
      </button>
    </div>
  )
}

export default Home;
