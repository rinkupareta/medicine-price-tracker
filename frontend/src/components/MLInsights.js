import React, { useEffect, useState } from "react";

function MLInsights({ query, currentLowest }) {
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchInsight = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8001/api/ml/generic-alternative?medicine=${query}`);
        const data = await res.json();
        setInsight(data);
      } catch (err) {
        console.error("ML fetch failed", err);
      }
      setLoading(false);
    };

    fetchInsight();
  }, [query]);

  if (!query) return null;

  return (
    <div className="ml-card">
      <h2>ML Price Insights</h2>
      <p className="ml-subtitle">AI-powered alternative suggestions & trends</p>

      {loading && <p className="loading-state">Analyzing price trends...</p>}

      {insight && insight.found ? (
        <div className="ml-content-box">
          <div className="ml-stat-row">
            <span className="ml-stat-label">Generic Alternative</span>
            <span className="ml-stat-value">{insight.generic_name}</span>
          </div>
          <div className="ml-stat-row">
            <span className="ml-stat-label">Avg Market Price</span>
            <span className="ml-stat-value" style={{ color: "var(--text-muted)" }}>₹{insight.avg_price}</span>
          </div>
          {currentLowest && (
            <div className="ml-stat-row">
              <span className="ml-stat-label">Current Lowest Found</span>
              <span className="ml-stat-value" style={{ color: "var(--accent-teal)" }}>₹{currentLowest}</span>
            </div>
          )}
          <div className="ml-alert">
            💡 {insight.message}
          </div>
        </div>
      ) : (
        insight && !insight.found && (
          <div className="ml-content-box">
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>{insight.message}</p>
          </div>
        )
      )}
    </div>
  );
}

export default MLInsights;