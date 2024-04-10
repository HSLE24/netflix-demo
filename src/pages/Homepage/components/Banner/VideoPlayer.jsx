import React from 'react';
import YouTube from 'react-youtube';

class VideoPlayer extends React.Component {
  render() {
    const opts = {
      height: '390',
      width: '640',
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