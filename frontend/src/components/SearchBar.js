import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') onSearch(input);
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search for medicine, brand, or formula..."
      />
      <button className="search-button" onClick={() => onSearch(input)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </div>
  );
}

export default SearchBar;