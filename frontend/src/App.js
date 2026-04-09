import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ResultsTable from './components/ResultsTable';
import MLInsights from './components/MLInsights';
import './App.css';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (medicine) => {
    if (!medicine) return;

    setLoading(true);
    setError('');
    setQuery(medicine);

    try {
      const response = await fetch(
        `http://localhost:8000/api/search?query=${encodeURIComponent(medicine)}`
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('❌ Backend not running or error occurred');
      setResults(null);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <header>
        <h1>💊 Medicine Price Tracker</h1>
        <p>Compare prices + ML insights</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      {loading && <p>🔄 Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {results && (
        <>
          <ResultsTable results={results} />
          <MLInsights query={query} />
        </>
      )}
    </div>
  );
}

export default App;