import React, { useState } from 'react';

function ProfilePage({ cartItems, setActiveTab }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (email) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="page-container fade-in" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh'}}>
        <div className="ml-card" style={{width: '100%', maxWidth: '400px', textAlign: 'center', padding: '40px 30px'}}>
          <div style={{fontSize: '48px', marginBottom: '20px'}}>👤</div>
          <h2 style={{marginBottom: '10px'}}>Welcome Back</h2>
          <p style={{color: 'var(--text-muted)', marginBottom: '30px'}}>Sign in to save your carts and preferences</p>
          
          <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <input 
              type="email" 
              placeholder="Email Address" 
              className="search-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{width: '100%', padding: '14px 20px', borderRadius: 'var(--radius-sm)'}}
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="search-input" 
              required
              style={{width: '100%', padding: '14px 20px', borderRadius: 'var(--radius-sm)'}}
            />
            <button type="submit" className="btn-buy" style={{padding: '14px', marginTop: '10px', fontSize: '16px', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', fontWeight: 'bold'}}>
              Sign In
            </button>
          </form>
          <p style={{marginTop: '20px', fontSize: '13px', color: 'var(--text-muted)'}}>
            Don't have an account? <span style={{color: 'var(--accent-teal)', cursor: 'pointer'}}>Sign up</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
          <div style={{width: '60px', height: '60px', borderRadius: '50%', background: 'var(--accent-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', color: '#fff'}}>
            {email.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2>My Profile</h2>
            <p>{email}</p>
          </div>
        </div>
        <button className="btn-cart" onClick={() => setIsLoggedIn(false)} style={{padding: '10px 20px'}}>Sign Out</button>
      </div>

      <div className="main-grid">
        <div className="profile-section">
          <div className="ml-card" style={{marginBottom: '30px'}}>
            <h3 style={{marginBottom: '20px'}}>Saved Carts</h3>
            {cartItems.length > 0 ? (
              <div className="saved-cart-card" style={{background: 'rgba(2, 6, 23, 0.5)', padding: '20px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255,255,255,0.05)'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
                  <span style={{fontWeight: '600'}}>Current Session Cart</span>
                  <span style={{color: 'var(--text-muted)'}}>{cartItems.length} items</span>
                </div>
                <div style={{display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px'}}>
                  {cartItems.map((item, i) => (
                    <div key={i} style={{background: 'rgba(30, 41, 59, 0.8)', padding: '10px', borderRadius: '8px', minWidth: '120px', fontSize: '13px', flexShrink: 0}}>
                      <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '500'}}>{item.name}</div>
                      <div style={{color: 'var(--accent-teal)', marginTop: '5px'}}>₹{item.price}</div>
                    </div>
                  ))}
                </div>
                <button 
                  className="btn-buy" 
                  style={{marginTop: '15px', width: '100%', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}
                  onClick={() => setActiveTab('cart')}
                >
                  Go to Cart
                </button>
              </div>
            ) : (
              <p style={{color: 'var(--text-muted)'}}>You have no saved carts. Add items to your cart to see them here.</p>
            )}
          </div>
          
          <div className="ml-card">
            <h3 style={{marginBottom: '20px'}}>Recent Searches</h3>
            <ul style={{listStyle: 'none', padding: 0}}>
              {['Dolo 650', 'Paracetamol 500mg', 'Vitamin C Zinc'].map((search, i) => (
                <li key={i} style={{padding: '12px 0', borderBottom: i < 2 ? '1px solid var(--card-border)' : 'none', display: 'flex', justifyContent: 'space-between'}}>
                  <span style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <span style={{color: 'var(--text-muted)'}}>🔍</span> {search}
                  </span>
                  <button className="btn-cart" style={{padding: '6px 12px', fontSize: '12px'}} onClick={() => { setActiveTab('home'); /* would trigger search in real app */ }}>Search Again</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="profile-settings ml-card" style={{alignSelf: 'start'}}>
          <h3 style={{marginBottom: '20px'}}>Account Settings</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <div className="setting-row" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(2, 6, 23, 0.3)', borderRadius: '8px'}}>
              <div>
                <h4 style={{marginBottom: '4px'}}>Email Notifications</h4>
                <p style={{fontSize: '12px', color: 'var(--text-muted)'}}>Receive price drop alerts</p>
              </div>
              <div className="toggle" style={{width: '40px', height: '20px', background: 'var(--accent-teal)', borderRadius: '10px', position: 'relative', cursor: 'pointer'}}>
                <div style={{width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px'}}></div>
              </div>
            </div>
            <div className="setting-row" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(2, 6, 23, 0.3)', borderRadius: '8px'}}>
              <div>
                <h4 style={{marginBottom: '4px'}}>Dark Mode</h4>
                <p style={{fontSize: '12px', color: 'var(--text-muted)'}}>App appearance</p>
              </div>
              <div className="toggle" style={{width: '40px', height: '20px', background: 'var(--accent-teal)', borderRadius: '10px', position: 'relative', cursor: 'pointer'}}>
                <div style={{width: '16px', height: '16px', background: '#fff', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px'}}></div>
              </div>
            </div>
            <button style={{padding: '12px', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px', cursor: 'pointer', marginTop: '10px', transition: 'all 0.2s', fontWeight: 'bold'}} onMouseOver={(e) => e.target.style.background='rgba(239, 68, 68, 0.1)'} onMouseOut={(e) => e.target.style.background='transparent'}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
