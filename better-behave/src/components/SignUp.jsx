import { createUserWithEmailAndPassword } from 'firebase/auth';
// SignIn.js

import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import { useState } from 'react';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Create a history object
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      
      navigate('/');

    } catch (error) {
      console.error('Sign up failed', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}

export default SignUp;
