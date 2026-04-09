import React from 'react';

function ResultsTable({ results }) {
  if (!results || !results.results || results.results.length === 0) {
    return (
      <div className="results-card">
        <p style={{ color: "var(--text-muted)", padding: "20px" }}>No pricing data available for this query.</p>
      </div>
    );
  }

  return (
    <div className="results-card">
      <table className="results-table">
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Price</th>
            <th>Pharmacy</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {results.results.map((item, i) => (
            <tr className="table-row" key={i}>
              <td>
                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                  <div style={{background: "rgba(20, 184, 166, 0.15)", padding: "8px", borderRadius: "8px"}}>💊</div>
                  {item.name || results.query}
                </div>
              </td>
              <td className="price-tag">₹{item.price}</td>
              <td><span className="plat-badge">{item.platform}</span></td>
              <td><span className="badge-stock">In Stock</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsTable;