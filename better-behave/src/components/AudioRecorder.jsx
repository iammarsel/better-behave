import React, { useState } from 'react';
import { MediaRecorder, useMediaRecorder } from 'react-media-recorder';
import AWS from 'aws-sdk';

const AudioRecorder = () => {
  const [audioURL, setAudioURL] = useState('');
  const { status, startRecording, stopRecording } = useMediaRecorder({
    audio: true,
  });

  const uploadAudioToS3 = (audioBlob) => {
    // Configure AWS SDK
    AWS.config.update({
      accessKeyId: 'AKIASDV37J6XIM5D56T7',
      secretAccessKey: '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',
    });

    const s3 = new AWS.S3();
    const params = {
      Bucket: 'gimme-job-audio',
      Key: 'audio.wav',
      Body: audioBlob,
      ACL: 'public-read', // Optional: Set ACL for public access
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading to S3:', err);
      } else {
        console.log('File uploaded to S3 successfully:', data.Location);
        setAudioURL(data.Location); // Store the S3 URL
      }
    });
  };

  return (
    <div>
      {status === 'idle' ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : null}
      {status === 'recording' ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : null}
      {audioURL && (
        <div>
          <audio controls src={audioURL}></audio>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
