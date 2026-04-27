import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function InsightsPage({ query, currentLowest }) {
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState([]);

  // Mock historical data for graph
  const generateMockData = () => {
    const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
    return months.map(month => ({
      name: month,
      PharmEasy: Math.floor(Math.random() * 50) + 150,
      Netmeds: Math.floor(Math.random() * 50) + 140,
      Apollo: Math.floor(Math.random() * 50) + 160,
      OneMG: Math.floor(Math.random() * 50) + 145,
    }));
  };

  useEffect(() => {
    setGraphData(generateMockData());
    
    if (!query) {
        setInsight({message: "Search for a medicine on the Home page to unlock full AI predictions and alternative generic analysis."});
        return;
    }

    const fetchInsight = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/ml/generic-alternative?medicine=${query}`);
        const data = await res.json();
        setInsight(data);
      } catch (err) {
        console.error("ML fetch failed", err);
        setInsight({message: "Failed to fetch ML insights. Backend might be unavailable."});
      }
      setLoading(false);
    };

    fetchInsight();
  }, [query]);

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h2><span role="img" aria-label="chart">📊</span> ML Insights Dashboard</h2>
        <p>Market trends and AI predictions {query ? `for ${query}` : "across the market"}</p>
      </div>

      <div className="main-grid">
        <div className="insights-graph-section ml-card" style={{height: '500px'}}>
          <h3>Price Trends (Last 6 Months)</h3>
          <p style={{fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px'}}>Historical pricing data across top 4 platforms</p>
          <div style={{ width: '100%', height: '380px' }}>
            <ResponsiveContainer>
              <LineChart
                data={graphData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-muted)" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', border: '1px solid var(--card-border)', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }} 
                  itemStyle={{color: '#fff'}}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}}/>
                <Line type="monotone" dataKey="PharmEasy" stroke="#14b8a6" strokeWidth={3} activeDot={{ r: 8 }} dot={{ r: 4, strokeWidth: 2 }} />
                <Line type="monotone" dataKey="Netmeds" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                <Line type="monotone" dataKey="Apollo" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                <Line type="monotone" dataKey="OneMG" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="insights-stats-section" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div className="ml-card">
            <h3 style={{marginBottom: '15px'}}>Top Highlights</h3>
            <div className="ml-stat-row">
              <span className="ml-stat-label">Cheapest Platform</span>
              <span className="ml-stat-value" style={{color: 'var(--accent-teal)'}}>Netmeds</span>
            </div>
            {currentLowest && (
              <div className="ml-stat-row">
                <span className="ml-stat-label">Current Lowest Price</span>
                <span className="ml-stat-value">₹{currentLowest}</span>
              </div>
            )}
            <div className="ml-stat-row">
              <span className="ml-stat-label">Price Trend</span>
              <span className="ml-stat-value" style={{color: '#10b981'}}>↘ Falling</span>
            </div>
            <div className="ml-stat-row">
              <span className="ml-stat-label">Stockout Risk</span>
              <span className="ml-stat-value" style={{color: '#10b981'}}>Low Risk (8%)</span>
            </div>
          </div>

          <div className="ml-card" style={{flex: 1}}>
            <h3 style={{marginBottom: '15px'}}>ML Predictions</h3>
            {loading && <p className="loading-state">Analyzing...</p>}
            
            {insight && insight.found ? (
              <div className="ml-content-box">
                <div className="ml-stat-row">
                  <span className="ml-stat-label">Generic Alternative</span>
                  <span className="ml-stat-value">{insight.generic_name}</span>
                </div>
                <div className="ml-stat-row">
                  <span className="ml-stat-label">Avg Market Price</span>
                  <span className="ml-stat-value" style={{color: "var(--text-muted)"}}>₹{insight.avg_price}</span>
                </div>
                <div className="ml-alert">
                  💡 {insight.message}
                </div>
              </div>
            ) : (
              <div className="ml-content-box" style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <p style={{color: "var(--text-muted)", fontSize: "14px", textAlign: 'center', lineHeight: '1.6'}}>
                  <span role="img" aria-label="brain" style={{display: 'block', fontSize: '32px', marginBottom: '10px', opacity: 0.5}}>🧠</span>
                  {insight ? insight.message : "Search for a medicine to see ML insights and generic alternatives."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsightsPage;
