import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { NavLink } from "react-router-dom"; // Assuming you're using react-router-dom for navigation
import "./loading.css";
import AudioRecorderButton from "./AudioRecorderButton";

function Question() {
  const [jobPositions, setJobPositions] = useState([]);
  const [newJobPosition, setNewJobPosition] = useState("");
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
            "Assume the role of an experienced HR recruiter specializing in high-level job positions, guiding candidates on how to excel in interviews. When I provide you with the job title, and if it's coding-related,  Based on this information, pose a relevant question and await the user's answer. Once the user responds, offer comprehensive feedback on their answer, highlighting areas for improvement and aspects they should focus on. Then, rate their response on a scale of 1 to 100 and inquire if they'd like to retry or proceed to another question. If the user is unsatisfied with a question or wishes to change the subject, they can prompt 'next question', and you should present a new one. Continue this process until the user indicates they're done by saying 'it's enough'",
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
    <div>
      <h1>Welcome</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
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
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              value={newJobPosition}
              onChange={(e) => setNewJobPosition(e.target.value)}
              placeholder="Specify your job position"
            />
            <button onClick={handleAddJobPosition}>Add</button>
          </div>
        )}

        <button onClick={() => fetchChatGPT(selectedJob)}>Submit</button>
      </div>
      <h3>Selected Job: {selectedJob}</h3>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`border m-5 p-4 rounded-3xl ${
              index % 2 === 0 ? "rounded-bl-none bg-blue-500" : " rounded-br-none bg-gray-300"
            } shadow-sm mb-2`}
          >
            {message}
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="center">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      )}
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <button onClick={sendTranscriptToChatGPT}>Send</button>
    </div>
  );
}

export default Question;
