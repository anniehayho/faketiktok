import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
  const { url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay, showInfo } = props;
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [startY, setStartY] = useState(null);

  // Sample video data for the grid
  const videoGrid = [
    { url: require('../videos/video1.mp4'), views: '299.2K', pinned: true },
    { url: require('../videos/video2.mp4'), views: '866.2K', pinned: true },
    { url: require('../videos/video3.mp4'), views: '2.6M', pinned: true },
  ];

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
          container.scrollBy({
            top: -container.clientHeight,
            behavior: 'smooth'
          });
        } else {
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
      {showInfo && (
        <div className="profile-overlay">
          <div className="profile-header">
            <div className="profile-nav">
              <span className="back-arrow">←</span>
              <span className="notification-bell">@{username}</span>
              <span className="notification-bell">🔔</span>
            </div>
          </div>
          <div className="profile-content">
            <img src={profilePic} alt={username} className="profile-avatar" />
            <h2 className="profile-username">@{username}</h2>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">88</span>
                <span className="stat-label">Following</span>
              </div>
              <div className="stat">
                <span className="stat-number">735.9K</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat">
                <span className="stat-number">11.7M</span>
                <span className="stat-label">Likes</span>
              </div>
            </div>
            <div className="profile-buttons">
              <button className="follow-button">Follow</button>
              <button className="instagram-button">
                <span className="instagram-icon">📷</span>
              </button>
              <button className="more-button">⌵</button>
            </div>
            <p className="profile-bio">🔥band kids doing band things🔥</p>
            <p className="profile-link">
              <span className="link-icon">🔗</span>
              <a href="#">https://lnk.bio/burnthejukebox</a>
            </p>
          </div>
          <div className="profile-tabs">
            <div className="tab active">
              <span className="tab-icon">📱</span>
              <span className="tab-label">Viral Music Vids🔥</span>
            </div>
          </div>
          <div className="profile-grid">
            {videoGrid.map((video, index) => (
              <div key={index} className="grid-item">
                <video 
                  className="grid-video"
                  src={video.url}
                  muted
                  loop
                  playsInline
                />
                <div className="grid-item-overlay">
                  <span className="pinned-label">Pinned</span>
                  <span className="views">{video.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
