import React from 'react';

function CheckoutPage({ cartItems, setActiveTab }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  // Group by platform since users might need to buy from different pharmacies
  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.platform]) acc[item.platform] = [];
    acc[item.platform].push(item);
    return acc;
  }, {});

  const handleCheckout = (platform) => {
    // In a real app, this would construct a checkout URL or cart URL for the platform
    const platformItems = groupedItems[platform].map(i => i.name).join(', ');
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent('buy ' + platformItems + ' on ' + platform)}`;
    window.open(searchUrl, '_blank');
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <h2><span role="img" aria-label="credit-card">💳</span> Checkout</h2>
          <p>Review your cart and proceed to respective pharmacies</p>
        </div>
        <button className="btn-cart" style={{padding: '10px 20px'}} onClick={() => setActiveTab('cart')}>
          Back to Cart
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-state">
          <span role="img" aria-label="box" style={{fontSize: '48px'}}>📦</span>
          <p>No items to checkout.</p>
          <button className="btn-primary mt-20" onClick={() => setActiveTab('home')}>Go Back</button>
        </div>
      ) : (
        <div className="checkout-content main-grid">
          <div className="checkout-platforms">
            {Object.keys(groupedItems).map((platform) => {
              const platformTotal = groupedItems[platform].reduce((sum, item) => sum + (item.price || 0), 0);
              
              return (
                <div key={platform} className="platform-checkout-card ml-card" style={{marginBottom: '20px'}}>
                  <div className="platform-header" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid var(--card-border)', paddingBottom: '10px'}}>
                    <h3>{platform} Order</h3>
                    <span className="price-tag">₹{platformTotal}</span>
                  </div>
                  <ul className="checkout-item-list" style={{listStyle: 'none', padding: 0}}>
                    {groupedItems[platform].map((item, idx) => (
                      <li key={idx} style={{display: 'flex', justifyContent: 'space-between', padding: '10px 0', color: 'var(--text-muted)'}}>
                        <span>{item.name}</span>
                        <span style={{color: 'var(--text-main)'}}>₹{item.price}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    className="checkout-btn" 
                    onClick={() => handleCheckout(platform)}
                    style={{marginTop: '15px'}}
                  >
                    Proceed to Buy on {platform} ↗
                  </button>
                </div>
              );
            })}
          </div>

          <div className="cart-summary-card ml-card sticky-summary" style={{alignSelf: 'start'}}>
            <h3 style={{marginBottom: '20px'}}>Grand Total</h3>
            <div className="summary-row total" style={{display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', borderBottom: '1px solid var(--card-border)', paddingBottom: '20px'}}>
              <span>All Orders</span>
              <span style={{color: 'var(--accent-teal)'}}>₹{total}</span>
            </div>
            <p className="checkout-note" style={{fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6'}}>
              <span role="img" aria-label="lock">🔒</span> Note: Medicine Price Tracker does not process payments directly. You will be redirected to the respective pharmacy platforms to securely complete your purchase.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
