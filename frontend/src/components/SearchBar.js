import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter medicine"
      />
      <button onClick={() => onSearch(input)}>Search</button>
    </div>
  );
}

export default SearchBar;