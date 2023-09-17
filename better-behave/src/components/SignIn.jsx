import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_gimmejob.jpeg';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const buttonStyle = {
    backgroundColor: '#FECC57',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error('Sign in failed', error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#1A244D',
        width: '100%',
        minHeight: '100vh',
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
      <h2 className="text-3xl mb-4 text-white">Sign In</h2>
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
        className="px-4 py-2 border rounded-lg mb-2"
      />
      <button
        onClick={handleSignIn}
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
        Sign In
      </button>
    </div>
  );
}

export default SignIn;
