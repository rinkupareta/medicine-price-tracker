import React, { useEffect, useState } from "react";

function MLInsights({ query }) {
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchInsight = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/ml/generic-alternative?medicine=${query}`
        );

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
    <div>
      <h2>ML Insight</h2>

      {loading && <p>🔄 Loading ML...</p>}

      {insight && insight.found && (
        <div>
          <p><b>Generic:</b> {insight.generic_name}</p>
          <p><b>Avg Price:</b> ₹{insight.avg_price}</p>
          <p>{insight.message}</p>
        </div>
      )}

      {insight && !insight.found && <p>{insight.message}</p>}
    </div>
  );
}

export default MLInsights;