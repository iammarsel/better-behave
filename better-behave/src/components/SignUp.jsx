// import { createUserWithEmailAndPassword } from 'firebase/auth';
// // SignIn.js

// import { auth } from '../firebase';
// import { useNavigate } from 'react-router-dom'; // Import useHistory
// import { useState } from 'react';

// function SignUp() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate(); // Create a history object
//   const handleSignUp = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
      
//       navigate('/');

//     } catch (error) {
//       console.error('Sign up failed', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleSignUp}>Sign Up</button>
//     </div>
//   );
// }

// export default SignUp;
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_gimmejob.jpeg';


function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
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

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error('Sign up failed', error);
    }
  };

  const inputStyle = {
    width: '100%', // Make the input take full width
    padding: '12px', // Increase padding for better spacing
    fontSize: '1.2em', // Increase font size
    fontFamily: 'Arial, sans-serif', // Change font
    marginBottom: '1em' // Add some space at the bottom of the input
  };

  return (
    <div
      style={{
        backgroundColor: '#1A244D',
        width: '100%',
        minHeight: '100vh', // Set the minimum height to 100% of the viewport height
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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
      <h1 className="text-3xl mb-4 text-white">Sign Up</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 border rounded-lg mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-4 py-2 border m-2 rounded-lg mb-2"
      />
      <button
        onClick={handleSignUp}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#FFD700'; // Hover color
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#FECC57'; // Original color
        }}
        onMouseDown={(e) => {
          e.target.style.backgroundColor = '#FFA500'; // Clicked color
        }}
        onMouseUp={(e) => {
          e.target.style.backgroundColor = '#FECC57'; // Back to hover color
        }}
      >
        Sign Up
      </button>
    </div>
  );
}

export default SignUp;

