import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
// SignIn.js

import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_gimmejob.jpeg";



function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errText, setErrText] = useState("");
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

  const signInWithGoogle = () => {
    try {
      const provider = new GoogleAuthProvider(auth);
      signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      setErrText("Invalid Info, Try Again!");
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErrText("Invalid Info, Try Again!");
    }
  };

  const inputStyle = {
    width: "100%", // Make the input boxes take full width
    padding: "12px", // Increase padding for better spacing
    fontSize: "1.2em", // Increase font size
    fontFamily: "Arial, sans-serif", // Change font
    marginBottom: "1em", // Add some space at the bottom of the input
  };

  return (
    <div
      style={{
        backgroundColor: "#1A244D",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={logo} // Replace with the URL of your logo image
        alt="Logo"
        style={{
          position: "absolute",
          top: "20px", // Adjust the top position as needed
          left: "20px", // Adjust the left position as needed
          width: "250px", // Adjust the width of the logo as needed
        }}
      />
      <h1 className="text-3xl mb-4 text-white">Sign In</h1>
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
        onClick={handleSignIn}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#FFD700"; // Hover color
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#FECC57"; // Original color
        }}
        onMouseDown={(e) => {
          e.target.style.backgroundColor = "#FFA500"; // Clicked color
        }}
        onMouseUp={(e) => {
          e.target.style.backgroundColor = "#FECC57"; // Back to hover color
        }}
      >
        Sign In
      </button>
      <button className="fl flex my-14"
  onClick={signInWithGoogle}
  
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = '#F2F2F2';
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = 'white';
  }}
  onMouseDown={(e) => {
    e.target.style.backgroundColor = '#E0E0E0';
  }}
  onMouseUp={(e) => {
    e.target.style.backgroundColor = '#F2F2F2';
  }}
>
  <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className=" w-5" style={{ marginRight: '10px' }}></img> Sign In with Google
</button>
      <h3 style={{ color: "red" }}>{errText}</h3>
    </div>
  );
}

export default SignIn;
//fa-solid fa-user