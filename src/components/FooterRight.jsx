/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleCheck, faHeart, faCommentDots, faBookmark, faShare, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import './FooterRight.css';

function FooterRight({ likes, comments, saves, shares, profilePic, isMuted, toggleMute }) {

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);

  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => {
      setUserAddIcon(faCirclePlus);
    }, 3000);
  };

  const parseLikesCount = (count) => {
    if (typeof count == 'string') {
      if (count.endsWith('K')) {
        return count.slice(0, -1) * 1000;
      }
      return parseInt(count);
    }
    return count;
  }

  const formatLikesCount = (count) => {
    if(count >= 10000) {
      return (count/1000).toFixed(1) + 'K';
    }
    return count;
  }

  const handleLikeClick = () => {
    setLiked(prevLiked => !prevLiked);
  }

  const handleSaveClick = () => {
    if(!saved) {
      const currentUrl = window.location.href;
      navigator.clipboard.writeText(currentUrl).then(() => {
        alert('Link copied to clipboard');
      }).catch((error) => {
        console.error('Failed to copy link to clipboard', error);
      });
    }
    setSaved(!saved);
  }

  return (
    <div className='footer-right'>
      <div className='sidebar-icon'>
        {profilePic ? (
          <img src={profilePic} className='userprofile' alt='Profile' style={{ width: '45px', height: '45px', color: '#616161' }}/>
        ) : null}
        <FontAwesomeIcon icon={userAddIcon} className='useradd' style={{ width: '15px', height: '15px', color: '#FF0000'}} onClick={handleUserAddClick} />
      </div>
      <div className='sidebar-icon'>
        <FontAwesomeIcon icon={faHeart} style={{ width: '35px', height: '35px', color: liked ? '#FF0000' : 'white' }} onClick={handleLikeClick} />
        <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
      </div>
      <div className='sidebar-icon'>
        <FontAwesomeIcon icon={faCommentDots} style={{ width: '35px', height: '35px', color:'white' }} />
        <p>{comments}</p>
      </div>
      <div className='sidebar-icon'>
        {saved ? (
          <FontAwesomeIcon icon={faBookmark} style={{ width: '35px', height: '35px', color: '#FF0000' }} onClick={handleSaveClick} />
        ) : (
          <FontAwesomeIcon icon={faBookmark} style={{ width: '35px', height: '35px', color:'white' }} onClick={handleSaveClick} />
        )}
        <p>{saved ? saves + 1 : saves}</p>
      </div>
      <div className='sidebar-icon'>
        <FontAwesomeIcon icon={faShare} style={{ width: '35px', height: '35px', color:'white' }} />
        <p>{shares}</p>
      </div>
      <div className='sidebar-icon'>
        <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} style={{ width: '35px', height: '35px', color:'white' }} onClick={toggleMute} />
      </div>
      <div className='sidebar-icon record'>
        <img src='https://static.thenounproject.com/png/934821-200.png' alt='Record icon'></img>
      </div>
    </div>
  );
}

export default FooterRight;
