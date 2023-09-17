import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import React, { useState } from "react";
import Home from "./components/Home";
import Home2 from "./components/Home2";
import { useEffect } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Question from "./components/Question";
import JobContext from "./components/JobContext";
// import firebase from 'firebase/app';
import { auth } from "./firebase";


function App() {
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Unsubscribe when component unmounts
  }, []);

  return (
    <div className="App" style={{height: '100%', width:'100%',alignContent:'center'}}>
      <JobContext.Provider
        value={{ selectedJob, setSelectedJob, selectedType, setSelectedType }}
      >
        <Router>
          <Routes>
            <Route path="/" element={user ? <Home2 /> : <Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/question" element={<Question />} />
          </Routes>
        </Router>
      </JobContext.Provider>
    </div>
  );
}

export default App;
