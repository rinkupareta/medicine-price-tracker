import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ResultsTable from './components/ResultsTable';
import MLInsights from './components/MLInsights';
import './index.css';

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
      // In Docker this hits relative path mapped through Nginx or local testing via absolute
      const response = await fetch(`http://localhost:8000/api/search?query=${encodeURIComponent(medicine)}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('❌ Backend API unavailable');
      setResults(null);
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="header-title">
          <h1>
            <span role="img" aria-label="pill">💊</span> Medicine Price Tracker
          </h1>
          <p>Compare prices + ML insights across top Indian platforms</p>
        </div>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading && <div className="loading-state">🔄 Fetching live prices from all pharmacies...</div>}
      {error && <div style={{ color: '#ef4444', marginBottom: '20px', fontWeight: '500' }}>{error}</div>}

      {(results || query) && !loading && (
        <div className="main-grid">
          <div className="results-wrapper">
             <ResultsTable results={results} />
          </div>
          <div className="insights-wrapper">
             <MLInsights query={query} currentLowest={results?.results?.[0]?.price} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;