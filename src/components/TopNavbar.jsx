import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch } from '@fortawesome/free-solid-svg-icons';

const TopNavbar = ({ onSearch }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
      setSearchTerm('');
      setIsSearchVisible(false);
    }
  };

  return (
    <div className='top-navbar'>
      <FontAwesomeIcon icon={faTv} className='icon'/>
      <h2>Following | <span>For You</span></h2>
      <FontAwesomeIcon icon={faSearch} className='icon' onClick={toggleSearch} />
      {isSearchVisible && (
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          onKeyDown={handleSearch} 
          placeholder="Search..."
          className="search-input"
        />
      )}
    </div>
  );
};

export default TopNavbar;
