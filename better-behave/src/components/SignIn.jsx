// // src/components/SignIn.js
// import { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// // SignIn.js

// import { auth } from '../firebase';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// function SignIn() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate(); // Create a Navigate object
//   const handleSignIn = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);

//       navigate('/');
//     } catch (error) {
//       console.error('Sign in failed', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Sign In</h2>
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
//       <button onClick={handleSignIn}>Sign In</button>
//     </div>
//   );
// }

// export default SignIn;
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error('Sign in failed', error);
    }
  };

  const inputStyle = {
    width: '100%', // Make the input boxes take full width
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
            <h2 className="text-center mb-4">Sign In</h2>
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
                onClick={handleSignIn}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
