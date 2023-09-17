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

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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

  const buttonStyle = {
    width: '100%', // Make the button take full width
    padding: '12px', // Increase padding for better spacing
    fontSize: '1.2em', // Increase font size
    fontFamily: 'Arial, sans-serif' // Change font
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">Sign Up</h2>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                style={inputStyle}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                style={inputStyle}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary"
                style={buttonStyle}
                type="button"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

