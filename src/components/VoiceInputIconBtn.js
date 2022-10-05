import MicIcon from '@mui/icons-material/Mic';
import { IconButton } from '@mui/material';
import React, { useEffect, useMemo } from 'react';

const hasGetUserMedia = () => {
  return !!(navigator.mediaDevices.getUserMedia);
};

export default function VoiceInputIconBtn({ setQ, setInterimTranscript, voiceInput, setVoiceInput, setFocus }) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = useMemo(() => new SpeechRecognition() || null, [SpeechRecognition]);

  if (!SpeechRecognition) console.log("Speech Recognition Not Available");

  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = () => {
    // console.log('onstart');
    setVoiceInput(true);
  };

  // recognition.onspeechstart = () => {
  //   console.log('onspeechstart');
  // };

  // recognition.onspeechend = () => {
  //   console.log('onspeechend');
  // };


  // recognition.onaudiostart = () => {
  //   console.log('onaudiostart');
  // };

  // recognition.onaudioend = () => {
  //   console.log('onaudioend');
  // };

  recognition.onend = () => {
    // console.log('onend');
    setFocus();
    setVoiceInput(false);
    setInterimTranscript('');
  };
  // recognition.onsoundstart = () => {
  //   console.log('onsoundstart');
  // };
  // recognition.onsoundend = () => {
  //   console.log('onsoundend');
  // };

  recognition.onresult = (event) => {
    let final_transcript = '', interim_transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
        recognition.stop();
        setQ(final_transcript);
        return;
      } else {
        interim_transcript += event.results[i][0].transcript;
        setInterimTranscript(interim_transcript + '...');
      }
    }
  };

  const toggleRecording = () => {
    if (voiceInput) {
      setVoiceInput(false);
    } else {
      setVoiceInput(true);
      if (hasGetUserMedia() && !voiceInput) {
        recognition.start();
      }
    }
  };

  useEffect(() => {
    if (!voiceInput) recognition.stop();
  }, [voiceInput, recognition]);

  return (
    <IconButton aria-label="voice" size='small' onClick={toggleRecording}>
      <MicIcon />
    </IconButton>
  );
};