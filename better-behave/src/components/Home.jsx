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
      </button>
    </div>
  )
}

export default Home;
