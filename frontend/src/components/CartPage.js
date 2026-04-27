import React from 'react';

function CartPage({ cartItems, removeFromCart, setActiveTab }) {
  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h2><span role="img" aria-label="cart">🛒</span> Your Cart</h2>
        <p>{cartItems.length} items in your cart</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-state">
          <span role="img" aria-label="box" style={{fontSize: '48px'}}>📦</span>
          <p>Your cart is empty.</p>
          <button className="btn-primary mt-20" onClick={() => setActiveTab('home')}>Browse Medicines</button>
        </div>
      ) : (
        <div className="cart-page-content">
          <div className="cart-list">
            {cartItems.map((item, idx) => (
              <div key={idx} className="cart-list-item">
                <div className="cart-item-info">
                  <div className="cart-item-icon">💊</div>
                  <div>
                    <h4>{item.name}</h4>
                    <span className="plat-badge">{item.platform}</span>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <span className="price-tag" style={{fontSize: '18px'}}>₹{item.price}</span>
                  <button className="btn-remove" onClick={() => removeFromCart(idx)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary-card">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span style={{color: 'var(--accent-teal)'}}>Free</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total Amount</span>
              <span>₹{total}</span>
            </div>
            <button className="btn-checkout-large" onClick={() => setActiveTab('checkout')}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
