import React, { useState, useEffect, useContext } from "react";
import JobContext from "./JobContext";
import "./loading.css";
import AudioRecorderButton from './AudioRecorderButton';

function Question() {
    const { selectedJob, selectedType } = useContext(JobContext);
  
    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null);

    useEffect(() => {
        // Fetch the API immediately upon loading
        fetchChatGPT(selectedJob, selectedType);
    }, []);
  
    const fetchChatGPT = (job, type) => {
      setIsLoading(true);
      const API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
      const API_KEY = "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";
      const userContent = type 
      ? `Job: ${job}, Interview Type: ${type}`
      : `Job: ${job}`;

      const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Role: Assume the role of an expert HR recruiter specializing in high-level job positions. Your goal is to guide and evaluate candidates on interview performance. Procedure: Input: I'll provide a job title. If it's coding-related, I'll specify the interview type: technical, behavioral, or mixed. Questioning: Based on the input, pose a relevant interview question and wait for the user's response. Evaluation: After receiving the user's answer, provide detailed feedback. Highlight strengths and areas for improvement. Rate their response on a scale of 1 to 10. Navigation: If the user says 'next question', present a new one. If they say 'it's enough', conclude the session. Feedback Loop: After each session, ask the user for feedback on the AI's performance to ensure continuous improvement. Note: if there no indicatoin of technical or behavoiral type of interview go with mixed but do not sprecify for them. Dont reply to the first response with 'Great!' or words like that, procceed to the interview imediately. If an input 'Select a job position', instruct them to go back to the prevois page and select a jot position. "
        },
        {
          role: "user",
          content: userContent,
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
        const message = data.choices[0].message.content;
        setResponseMessage(message); // Update the state with the response
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  };
  return (
    <div>
      <h1 className="">Question 1: Tell me about Yourself</h1>
      <h1>Selected Job: {selectedJob}</h1>
      <h2>Selected Interview Type: {selectedType}</h2>
      {responseMessage && (
        <div
          id="responseBox"
          className="border p-4 rounded-3xl rounded-bl-none bg-blue-500 shadow-sm"
        >
          {responseMessage}
        </div>
      )}
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
      )}{" "}
      {/* Display loading indicator based on state */}
      <button onClick={() => fetchChatGPT("blue")}>Blue</button>
      <button onClick={() => fetchChatGPT("red")}>Red</button>
      <AudioRecorderButton />

    </div>
  );
}

export default Question;