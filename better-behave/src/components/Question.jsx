import React from 'react';

function Question() {
    const fetchChatGPT = (color) => {
        // Replace with your API endpoint and key
        const API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
        const API_KEY = "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";
//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
        const data = {
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "you are a paper. when you get color name you always freestyle based on that color"
                },
                {
                    role: "user",
                    content: `Say ${color}`
                }
            ]
        };

        fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            const message = data.choices[0].message.content;
            document.getElementById('responseBox').innerText = message;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <div>
        <h1 className=''>Question 1: Tell me about Yourself</h1>
        <div id="responseBox" className='border p-4 rounded-3xl rounded-bl-none bg-blue-500 shadow-sm'></div>
            <button onClick={() => fetchChatGPT("blue")}>Blue</button>
            <button onClick={() => fetchChatGPT("red")}>Red</button>
            
        </div>
    );

    function Audio() {
        return (
            <div className="Audio">
                <h1>Audio Recorder</h1>
                <AudioRecorder />
            </div>
        );
    }
}

export default Question;
