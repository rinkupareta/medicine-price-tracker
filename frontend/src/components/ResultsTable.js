import React from 'react';

function ResultsTable({ results, onAddToCart }) {
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
            <th>Actions</th>
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
              <td>
                <div className="actions-cell">
                  <a 
                    href={`https://www.google.com/search?q=${encodeURIComponent((item.name || results.query) + ' ' + item.platform)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-action btn-buy"
                  >
                    Buy Now ↗
                  </a>
                  <button 
                    className="btn-action btn-cart" 
                    onClick={() => onAddToCart && onAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsTable;