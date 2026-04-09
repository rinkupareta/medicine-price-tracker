import React from 'react';

function ResultsTable({ results }) {
  if (!results || !results.results) return null;

  return (
    <div>
      <h2>Results</h2>
      {results.results.map((item, i) => (
        <div key={i}>
          {item.name} - ₹{item.price} ({item.platform})
        </div>
      ))}
    </div>
  );
}

export default ResultsTable;