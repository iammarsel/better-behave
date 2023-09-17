import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import logo from '../assets/logo_gimmejob.jpeg';
import { db } from '../firebase';
import { NavLink } from "react-router-dom"; // Assuming you're using react-router-dom for navigation
import "./loading.css";

function Question() {
  const [jobPositions, setJobPositions] = useState([]);
  const [newJobPosition, setNewJobPosition] = useState("");
  //const [finalScore, setFinalScore] = useState(100);
  const [selectedJob, setSelectedJob] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const sendTranscriptToChatGPT = () => {
    setMessages((prevMessages) => [...prevMessages, transcript]);
    fetchChatGPT(transcript);
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening,
  } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const handleTryAgain = () => {
    setMessages((prevMessages) => [...prevMessages, "Try Again!"]);
    fetchChatGPT("Try Again!");
  };
  const handleNextQuestion = () => {
    setMessages((prevMessages) => [...prevMessages, "Next Question."]);
    fetchChatGPT("Next Question.");
  };
  const handleEnoughForToday = () => {
    setMessages((prevMessages) => [...prevMessages, "Enough for Today!"]);
    fetchChatGPT("Enough for Today! ");
    /*
    const data = {
      profession: newJobPosition,
      score: finalScore,
      date: 'right now'
    };
    db.collection('sessions').doc(newJobPosition).set(data);
    */
  };

  useEffect(() => {
    fetch("/jobPositions.txt")
      .then((response) => response.text())
      .then((data) => {
        const positions = data.split("\n").filter(Boolean);
        setJobPositions(positions);
      });
  }, []);

  const handleAddJobPosition = () => {
    const lowerCaseNewJobPosition = newJobPosition.toLowerCase();
    const jobExists = jobPositions.some(
      (job) => job.toLowerCase() === lowerCaseNewJobPosition
    );

    if (!jobExists) {
      const formattedJobPosition = capitalizeFirstLetter(newJobPosition);
      setJobPositions([...jobPositions, formattedJobPosition]);
      setSelectedJob(formattedJobPosition);
      setNewJobPosition("");
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  const clearMessages = () => {
    setMessages([]);
  };

  const fetchChatGPT = (job) => {
    setIsLoading(true);
    const API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
    const API_KEY = "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";

    const data = {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
          "Pretend to be an experienced HR recruiter specializing in high-level job positions, guiding candidates on how to excel in interviews. When I provide you with the job title,  based on that job title pose a relevant question and await the user's answer. Once the user responds, offer comprehensive feedback on their answer, highlighting areas for improvement and aspects they should focus on. Then, rate their response on a scale of 1 to 100 and inquire if they'd like to retry or proceed to another question. If the user  requires to retry it, let him do it by the comman 'Try Again' and /or if they want to skip the question, they will say 'Next question', and you should present a new one. Continue this process until the user indicates they're done by saying 'enough for the day'.  After it called 'enough for the day', give average score of all answers, and sent it only 2 digit number, nothing else. while you are giving your questions avoid any introduction words and generate only question."
      },
        ...messages.map((message) => ({ role: "user", content: message })),
        {
          role: "user",
          content: job,
        },
      ],
    };

    fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const newMessage = data.choices[0].message.content;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  };

  return (
    <div style={{ backgroundColor: '#1A244D', color: '#FECC57' }} className="bg-[#1A244D] text-[#FECC57] min-h-screen flex flex-col items-center p-5">
      <img src={logo} alt="Logo" className="absolute top-5 left-5 w-60" />

      <h1 className=" mb-5">Welcome!</h1>

      <div className="flex flex-row items-center justify-center">
        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="bg-white text-black p-2 rounded"
        >
          <option value="">Select a job position</option>
          {jobPositions.map((job) => (
            <option key={job} value={job}>
              {capitalizeFirstLetter(job)}
            </option>
          ))}
          <option value="different">Different job...</option>
        </select>

        {selectedJob === "different" && (
          <div className="flex space-x-2">
            <input
              type="text"
              value={newJobPosition}
              onChange={(e) => setNewJobPosition(e.target.value)}
              placeholder="Specify your job position"
              className="p-2 rounded"
            />
            <button  style={{ backgroundColor: '#FECC57', color: '#1A244D' }}  onClick={handleAddJobPosition} className="bg-[#FECC57] text-[#1A244D] p-2 rounded">Add</button>
          </div>
        )}

        <button
          onClick={() => {
            clearMessages();
            fetchChatGPT(selectedJob);
          }} style={{ backgroundColor: '#FECC57', color: '#1A244D' }}
          className="bg-[#FECC57] text-[#1A244D] mx-7 w-40 p-2 rounded"
        >
          Submit
        </button>
      </div>

      {/* <h3 className="text-2xl mt-5">Selected Job: {selectedJob}</h3> */}
<div className="flex flex-row">
      <div className="messages-container mt-5 space-y-5 w-full max-w-xl">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-3xl shadow-sm mb-2 ${index % 2 === 0 ? " rounded-bl-none bg-yellow-200 text-blue-900 bg-[#FECC57] text-[#1A244D]" : " rounded-br-none bg-blue-200  text-black"}`}
          >
            {message}
          </div>
        ))}

        <div style={{marginTop: 'auto'}} className="live-transcript-container pt-full mt-5">
          <h4 className="text-xl mb-3">Live Transcript:</h4>
          <div style={{minHeight: '35px'}} className="border m-5 h-auto min-h-32 py-2 p-auto m-auto text-sm rounded-3xl bg-gray-300 text-black shadow-sm mb-2">
            {transcript}
          </div>
        </div>
      </div>

      <div className="center mx-5">
        {...Array(10).fill().map((_, index) => (
          <div key={index} className={`wave ${isLoading ? "active" : ""}`}></div>
        ))}
      </div>
<div className="flex flex-col my-auto">
      <p className="mt-5">Microphone: {listening ? "on" : "off"}</p>
      <div className=""></div>

      <div className="flex space-x-4 m-auto mt-5">
        <button onClick={SpeechRecognition.startListening} style={{ backgroundColor: '#FECC57', color: '#1A244D' }} className="bg-[#FECC57] text-[#1A244D] w-20 p-2 rounded">Start</button>
        <button onClick={SpeechRecognition.stopListening} style={{ backgroundColor: '#FECC57', color: '#1A244D' }} className="bg-[#FECC57] text-[#1A244D] w-20 p-2 rounded">Stop</button>
        <button onClick={resetTranscript} style={{ backgroundColor: '#FECC57', color: '#1A244D' }} className="bg-[#FECC57] text-[#1A244D] p-2 w-20 rounded">Reset</button>
        <button onClick={() => { sendTranscriptToChatGPT(); resetTranscript(); }} style={{ backgroundColor: '#FECC57', color: '#1A244D' }} className="bg-[#FECC57] text-[#1A244D] p-2 w-20 rounded">Send</button>
      </div>

      <div className="buttons-container flex space-x-4 mt-5">
        <button onClick={() => { handleTryAgain(); resetTranscript(); }} style={{ backgroundColor: '#233068', color: '#FECC57' }} className="shadow-xl w-44  rounded-lg px-6 py-2 mb-4 hover:bg-opacity-80 transition duration-200 p-2 rounded">Try Again</button>
        <button onClick={() => { handleNextQuestion(); resetTranscript(); }} style={{ backgroundColor: '#233068', color: '#FECC57' }} className="shadow-xl w-44  rounded-lg px-6 py-2 mb-4 hover:bg-opacity-80 transition duration-200 p-2 rounded">Next Question</button>
         <button onClick={() => { handleEnoughForToday(); resetTranscript(); }} style={{ backgroundColor: '#233068', color: '#FECC57' }} className="shadow-xl w-44  rounded-lg px-6 py-2 mb-4 hover:bg-opacity-80 transition duration-200 p-2 rounded">Enough for Today!</button>
      </div>
    </div></div></div>
  );
}

export default Question;