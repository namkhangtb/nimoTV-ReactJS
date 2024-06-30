import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export const RemoteVideo = props => {
  const [mediaStream, setMediaStream] = useState();

  // useCalculateVoiceVolume(mediaStream, props.id);

  useEffect(() => {
    const interval = setInterval(() => {
      const stream = document.getElementById(props.id).srcObject;

      if (stream) {
        setMediaStream(stream);
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [props.id]);

  return (
    <VideoContainer>
      <Video {...props} autoPlay playsInline />
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  width: var(--width);
  height: var(--height);
  background-color: #3a3a3e;
  box-sizing: border-box;
  position: relative;
`;

const Video = styled.video`
  height: 100%;
  width: 100%;
`;
