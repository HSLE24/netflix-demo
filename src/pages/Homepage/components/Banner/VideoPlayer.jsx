import React from 'react';
import YouTube from 'react-youtube';

class VideoPlayer extends React.Component {
  render() {
    const isMobile = window.innerWidth <= 768; // 모바일인지 여부를 확인합니다.

    const opts = {
      height: isMobile ? '250' : '390', // 모바일 및 컴퓨터에 따라 높이를 조정합니다.
      width: isMobile ? '320' : '640', // 모바일 및 컴퓨터에 따라 너비를 조정합니다.
      playerVars: {
        autoplay: 1,
      },
    };

    return (
      <YouTube videoId={this.props.videoId} opts={opts} />
    );
  }
}

export default VideoPlayer;