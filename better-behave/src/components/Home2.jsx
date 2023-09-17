
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Updated import
import { auth, db } from '../firebase';
import logo from "../assets/logo_gimmejob.jpeg";


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
  const buttonStyle = {
    backgroundColor: "#FECC57",
    color: "#233068",
    padding: "8px 16px",
    marginTop: '30px',
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    width: "100%", // Make the button take full width
    padding: "12px", // Increase padding for better spacing
    fontSize: "1.2em", // Increase font size
    fontFamily: "Arial, sans-serif", // Change font
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
  
  //db.collection('sessions').doc('Question 1').set(data);
  const iframeStyle = {
    width: '150vh',
    height: '50vh',
    border: 'none',
  };

  const [completed, setCompleted] = useState(0);
  const [mastered, setMastered] = useState(0);
  useEffect(() => {
    const collectionRef = db.collection('sessions');
    (async () => {
      const snapshot = await collectionRef.get();
      setCompleted(snapshot.size);
      console.log(snapshot.size);
    })
    (async () => {
      const query = collectionRef.where('score', '>=', '80');
      const snapshot = await query.count().get();
      setMastered(snapshot.data().count);
    })
  })


 return (
    <div className="bg-1A244D min-h-screen flex flex-col items-center justify-center text-FECC57">
      <img
        src={logo} // Replace with the URL of your logo image
        alt="Logo"
        style={{
          position: "absolute",
          top: "20px", // Adjust the top position as needed
          left: "20px", // Adjust the left position as needed
          width: "250px", // Adjust the width of the logo as needed
        }}/>
      <h1 className="text-4xl mb-6">Welcome User!</h1>
      <button 
        onClick={handleSignOut}  
        style={buttonStyle}
        className="bg-FECC57 text-1A244D px-6 py-2 rounded-lg mb-4 hover:bg-opacity-80 transition duration-300 ease-in-out"
        
      >
        Sign Out
      </button>
      <button 
        style={buttonStyle} className="bg-FECC57 text-1A244D px-6 py-2 rounded-lg hover:bg-opacity-80 transition duration-300 ease-in-out">
        <NavLink to="/question" className="text-1A244D">
          New Interview Practice
        </NavLink>
      </button>
    </div>
);
 }

export default Home2;

