
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

  const data = {
    profession: 'Teacher',
    score: '71',
    date: 'testinggggg'
  };
  
  db.collection('sessions').doc('Question 1').set(data);
  const iframeStyle = {
    width: '150vh',
    height: '50vh',
    border: 'none',
  };
  return (
    <div>
      <h1>Welcome User!</h1>
      <h3>Practiced: 10</h3>
      <h3>Mastered: 4</h3>
      <iframe src='http://localhost:5000/' style={iframeStyle} title="Chart" /> 

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

