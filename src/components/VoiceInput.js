import React, { useEffect, useRef } from 'react';

function hasGetUserMedia() {
  return !!(navigator.mediaDevices.getUserMedia);
}

// const errorCallback = function (e) {
//   console.log('Reeeejected!', e);
// };

async function getMedia(constraints) {
  let stream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (err) {
    /* handle the error */
  }
}


export default function VoiceInput(props) {
  const media = useRef();

  useEffect(() => {
    (async () => {
      if (hasGetUserMedia()) {
        const stream = await getMedia({ video: false, audio: true });
        console.log(stream);
        console.log(media.current);
        media.current.srcObject = stream;
        media.current.onloadedmetadata = () => {
          media.current.play();
        };
      } else {
        console.error('getUserMedia() is not supported in your browser');
      }
    })();
  }, []);


  return (
    <div>
      {/* <input ref={media} type="file" accept="audio/*;capture=microphone"></input> */}
      <audio controls autoPlay ref={media}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}