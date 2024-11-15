import React from 'react';
import './VideoInfo.css';

const VideoInfo = ({ username, uploadDate, views, isVisible }) => {
  return (
    <div className={`video-info ${isVisible ? 'visible' : ''}`}>
      <div className="info-container">
        <h3>@{username}</h3>
        <div className="stats">
          <span>{uploadDate}</span>
          <span>•</span>
          <span>{views} views</span>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;