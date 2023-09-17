import React from 'react'
import { NavLink } from 'react-router-dom';
function Home2() {
  return (
    <div>
      <h1>Welcome User!</h1>
      <h3>Practiced: 10</h3>
      <h3>Mastered: 4</h3>
      <button>
      <NavLink to="/starter">
        New Interview Practice
      </NavLink>
      </button>
    </div>
  )
}

export default Home2;
