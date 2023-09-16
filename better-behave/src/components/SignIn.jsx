// src/components/SignIn.js
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Create a Navigate object
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate('/');
    } catch (error) {
      console.error('Sign in failed', error);
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
    </div>
  );
}

export default SignIn;
