import React, { forwardRef } from 'react';
import styled from 'styled-components';

export const LocalVideo = forwardRef((props, ref) => {
  return (
    <VideoContainer>
      <Video {...props} ref={ref} autoPlay playsInline muted />
    </VideoContainer>
  );
});

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
