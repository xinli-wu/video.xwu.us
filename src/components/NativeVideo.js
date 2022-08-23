import axios from 'axios';
import React from 'react';
import './Video.css';

window.HELP_IMPROVE_VIDEOJS = false;

const SERVER_URL = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/video/yt`;

export const NativeVideo = ({ videoId }) => {

  const [info, setInfo] = React.useState();
  const [format, setFormat] = React.useState();

  React.useEffect(() => {
    (async () => {
      const res = await axios(`${SERVER_URL}/info/${videoId}`);
      setInfo(res.data);
    })();
  }, [videoId]);

  React.useEffect(() => {
    (async () => {
      const res = await axios(`${SERVER_URL}/format/${videoId}`);
      setFormat(res.data);
    })();
  }, [videoId]);

  return (
    <>
      {info && <p>{info?.videoDetails?.title}</p>}
      {format && (
        <video style={{ width: '100%' }} controls>
          <source src={`${SERVER_URL}/${videoId}`} type={format.mimeType} />
          Your browser does not support HTML video.
        </video>
      )}

    </>
  );
};
