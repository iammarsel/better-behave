// src/components/SignIn.js
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// SignIn.js

import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errText, setErrText] = useState('');
  const navigate = useNavigate(); // Create a Navigate object
  
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider(auth);
    signInWithPopup(auth,provider);
  }
  
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate('/');
    } catch (error) {
      setErrText('Invalid Info, Try Again!')
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <h3 style={{color: 'red'}}>{errText}</h3>
    </div>
  );
}

export default SignIn;
