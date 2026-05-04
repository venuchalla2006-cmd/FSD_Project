import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, bookingPayload } = location.state || {};
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!amount || !bookingPayload) {
    return <Navigate to="/" />;
  }

  const handlePayment = async () => {
    setProcessing(true);
    setError('');
    
    // Simulate payment gateway delay before API call
    setTimeout(async () => {
      try {
        await axios.post('http://localhost:8083/api/book-ticket', bookingPayload);
        setProcessing(false);
        setSuccess(true);
      } catch (err) {
        const respData = err.response?.data;
        setError(typeof respData === 'string' ? respData : (respData?.message || 'Failed to confirm booking with server.'));
        setProcessing(false);
      }
    }, 1500);
  };

  if (success) {
    return (
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <h2 className="title" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Payment Successful!</h2>
        
        {/* Digital Ticket UI */}
        <div className="glass-card" style={{ padding: '0', overflow: 'hidden', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--primary-hover))', color: 'white', padding: '2rem', textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', width: '30px', height: '30px', background: 'var(--bg-gradient)', borderRadius: '50%' }}></div>
            <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.8rem', opacity: 0.8, marginBottom: '0.5rem' }}>Admit {bookingPayload.ticketsBooked}</p>
            <h3 style={{ fontSize: '2rem', margin: 0, fontWeight: 700 }}>AuraTix Pass</h3>
            <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>{bookingPayload.event?.name || 'Festival Entry'}</p>
          </div>
          
          <div style={{ background: 'white', padding: '2rem', position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Name</p>
                <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{bookingPayload.name}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Department</p>
                <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{bookingPayload.department}</p>
              </div>
            </div>
            
            <div style={{ borderTop: '2px dashed #e2e8f0', margin: '1rem 0', paddingTop: '2rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>Scan at Entry</p>
              <div style={{ display: 'inline-block', padding: '1rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', gap: '4px', height: '60px', alignItems: 'center' }}>
                  {[...Array(24)].map((_, i) => (
                    <div key={i} style={{ width: Math.random() > 0.5 ? '4px' : '2px', height: '100%', background: '#1e293b' }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button className="btn btn-primary" onClick={() => navigate('/my-tickets')}>
            View in My Tickets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <div className="glass-card">
        <h2 className="title" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Secure Payment</h2>
        
        <div style={{ background: 'rgba(241, 245, 249, 0.8)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Amount to Pay</p>
          <p style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>
            ${amount.toFixed(2)}
          </p>
        </div>

        <div className="form-group">
          <label className="form-label">Card Number</label>
          <input type="text" className="form-control" placeholder="**** **** **** ****" defaultValue="4242 4242 4242 4242" />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label className="form-label">Expiry</label>
            <input type="text" className="form-control" placeholder="MM/YY" defaultValue="12/28" />
          </div>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label className="form-label">CVV</label>
            <input type="text" className="form-control" placeholder="***" defaultValue="123" />
          </div>
        </div>

        {error && <p className="error-text text-center" style={{ marginBottom: '1rem' }}>{error}</p>}

        <button 
          className="btn btn-primary btn-block" 
          onClick={handlePayment}
          disabled={processing}
        >
          {processing ? 'Processing Payment & Booking...' : `Pay $${amount.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
};

export default Payment;
