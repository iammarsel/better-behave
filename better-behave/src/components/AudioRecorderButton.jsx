import React, { useState, useRef } from 'react';

function AudioRecorderButton() {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks.current, { type: 'audio/wav' });
        audioRef.current.src = URL.createObjectURL(audioBlob);

        // Handle storing the audioBlob here (e.g., send to a server, save locally, etc.)
        // Example: You can send it to a server using the fetch API.
        // fetch('/upload-audio', {
        //   method: 'POST',
        //   body: audioBlob,
        // });

        chunks.current = [];
      };

      recorder.start();
      setRecording(true);
      setMediaRecorder(recorder);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div>
      <button onClick={toggleRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <audio ref={audioRef} controls style={{ marginTop: '10px' }} />
    </div>
  );
}

export default AudioRecorderButton;
