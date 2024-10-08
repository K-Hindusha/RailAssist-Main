// speech.jsx
import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

const SpeechRecognitionComponent = ({ onSpeechCommand }) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [textResponse, setTextResponse] = useState('');

  useEffect(() => {
    // Check if the browser supports speech recognition
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      alert("Your browser does not support speech recognition.");
    }

    // Log the current state to help with debugging
    console.log(`Listening: ${listening}`);
  }, [listening]);

  const handleSpeechRecognition = () => {
    console.log("Start Listening clicked");
    SpeechRecognition.startListening({ continuous: false });
  };

  const handleStop = () => {
    console.log("Stop Listening clicked");
    SpeechRecognition.stopListening();
    processTranscript(transcript);
  };

  const processTranscript = async (transcript) => {
    console.log("Processing Transcript:", transcript);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          prompt: transcript,
          model: "text-davinci-003",
          max_tokens: 150
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log("API Response:", response.data.choices[0].text);
      setTextResponse(response.data.choices[0].text);
      if (onSpeechCommand) onSpeechCommand(response.data.choices[0].text);
    } catch (error) {
      console.error("Error processing transcript:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSpeechRecognition}>Start Listening</button>
      <button onClick={handleStop}>Stop Listening</button>
      <p>Listening: {listening ? "Yes" : "No"}</p>
      <p>Transcript: {transcript}</p>
      <p>Response: {textResponse}</p>
    </div>
  );
};

export default SpeechRecognitionComponent;
