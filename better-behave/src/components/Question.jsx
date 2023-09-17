import React, { useState, useEffect, useContext } from "react";
import JobContext from "./JobContext";
import "./loading.css";

function Question() {
    const { selectedJob, selectedType } = useContext(JobContext);

  const [isLoading, setIsLoading] = useState(false);

  const [responseMessage, setResponseMessage] = useState(null); // New state variable

  const fetchChatGPT = (color) => {
    setIsLoading(true);
    const API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
    const API_KEY = "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";
    //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
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "give description of the color",
        },
        {
          role: "user",
          content: `Say ${color}`,
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
    </div>
  );
}

export default Question;
