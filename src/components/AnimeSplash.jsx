import React, { Component } from 'react';
// import Search from './Search.jsx';
// import Navbar from './Navbar.jsx';

// import '../css/AnimeSplash.css'

class AnimeSplash extends Component {
  render() {
    return (
      <div className='AnimeSplashContainer'>
        <video
          id="my-player"
          className="video-js"
          controls
          preload="auto"
          poster="//vjs.zencdn.net/v/oceans.png"
          data-setup='{}'>
            <source src="https://www14.mp4upload.com:282/d/qwxy3pc7z3b4quuolouqqicjlplbnw5p2gfzsusjk5vqgjkssgtjgztu/video.mp4" type="video/mp4"></source>
            <p className="vjs-no-js">
              To view this video please enable JavaScript, and consider upgrading to a
              web browser that
              <a href="http://videojs.com/html5-video-support/" target="_blank" rel="noopener noreferrer">
                supports HTML5 video
              </a>
            </p>
        </video>
      </div>
    );
  }
}

export default AnimeSplash;