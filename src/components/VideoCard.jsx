import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
  const { url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay } = props;
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [startY, setStartY] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (autoplay) {
      videoRef.current.play();
    }
  }, [autoplay]);

  const onVideoPress = () => {
    if(videoRef.current.paused) {
      videoRef.current.play();
    }
    else {
      videoRef.current.pause();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRef.current.muted = !isMuted;
  }

  const handleMouseDown = (e) => {
    setStartY(e.clientY);
  }

  const handleMouseMove = (e) => {
    if (startY !== null) {
      const deltaY = e.clientY - startY;
      if (Math.abs(deltaY) > 100) {
        const container = document.querySelector('.container');
        if (deltaY > 0) {
          // Scroll to previous video
          container.scrollBy({
            top: -container.clientHeight,
            behavior: 'smooth'
          });
        } else {
          // Scroll to next video
          container.scrollBy({
            top: container.clientHeight,
            behavior: 'smooth'
          });
        }
        setStartY(null);
      }
    }
  };

  const handleMouseUp = () => {
    setStartY(null);
  };

  return (
    <div 
      className='video'
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <video className='player'
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        src={url}
        muted={isMuted}
      />
      <div className='bottom-controls'>
        <div className='footer-left'>
          <FooterLeft username={username} description={description} song={song}/>
        </div>
        <div className='footer-right'>
          <FooterRight likes={likes} shares={shares} comments={comments} saves={saves} profilePic={profilePic} isMuted={isMuted} toggleMute={toggleMute}/>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
