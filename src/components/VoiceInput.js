import MicIcon from '@mui/icons-material/Mic';
import { IconButton } from '@mui/material';
import React, { useEffect, useMemo } from 'react';

const hasGetUserMedia = () => {
  return !!(navigator.mediaDevices.getUserMedia);
};

export default function VoiceInput({ setQ, voiceInput, setVoiceInput, setFocus }) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = useMemo(() => new SpeechRecognition() || null, [SpeechRecognition]);
  if (!SpeechRecognition) console.log("Speech Recognition Not Available");

  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = () => {
    setVoiceInput(true);
  };

  recognition.onspeechend = () => {
    recognition.stop();
    setVoiceInput(false);
  };

  recognition.onresult = (event) => {
    let final_transcript = '';//, interim_transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        // interim_transcript += event.results[i][0].transcript;
      }
    }
    setQ(final_transcript);
    setFocus();
    setVoiceInput(false);
  };

  const startRecording = () => {
    setVoiceInput(true);
    if (hasGetUserMedia() && !voiceInput) {
      recognition.start();
    }
  };

  useEffect(() => {
    if (!voiceInput) {
      recognition.stop();
    }
  }, [voiceInput, recognition]);

  return (
    <>
      <IconButton aria-label="voice" size='small' onMouseUp={startRecording} disabled={voiceInput}>
        <MicIcon />
      </IconButton>
      {/* <audio src="" controls ref={audioRef}>
        Your browser does not support the audio element.
      </audio> */}
    </>
  );
};