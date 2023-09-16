import React from 'react'
import { NavLink } from 'react-router-dom';
function Home() {
  return (
    <div>
      <h1>Welcome User!</h1>
      <h3>Practiced: 10</h3>
      <h3>Mastered: 4</h3>
      <button>
      <NavLink to="/question" className="w-28 h-8 mx-12 inline-block mt-24 bg-gray-800 text-white rounded-xl">
        New Interview Practice
      </NavLink>
      </button>
    </div>
  )
}

export default Home
