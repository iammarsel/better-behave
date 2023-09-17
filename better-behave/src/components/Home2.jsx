
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Updated import
import { auth, db } from '../firebase';

function Home2() {
  console.log("Home")
  const navigate = useNavigate(); // Updated usage
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // ...
      navigate('/'); // Redirect to Home.js after sign out
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  db.collection('sessions').doc('session_template').get().then((data) => {
    console.log(data.data());
  });
  // .update() for changes

  return (
    <div>
      <h1>Welcome User!</h1>
      <h3>Practiced: 10</h3>
      <h3>Mastered: 4</h3>

      <button onClick={handleSignOut}>Sign Out</button>
      <button>
      <NavLink to="/starter">
        New Interview Practice
      </NavLink>
      </button>
    </div>
  );
}

export default Home2;

