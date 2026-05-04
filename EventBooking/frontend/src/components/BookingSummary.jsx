import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

const BookingSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, event } = location.state || {};

  if (!booking || !event) {
    return <Navigate to="/" />;
  }

  const handleProceedToPayment = () => {
    navigate('/payment', { state: { bookingPayload: booking, amount: booking.totalAmount } });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <div className="glass-card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', color: 'var(--success-color)', marginBottom: '1rem' }}>✓</div>
        <h2 className="title" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Booking Summary</h2>
        
        <div style={{ background: 'rgba(241, 245, 249, 0.8)', padding: '2rem', borderRadius: '0.5rem', textAlign: 'left', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>User Name</span>
            <span style={{ fontWeight: '500' }}>{booking.name}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Event Name</span>
            <span style={{ fontWeight: '500', color: 'var(--primary-color)' }}>{event.name}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Tickets Booked</span>
            <span style={{ fontWeight: '500' }}>{booking.ticketsBooked}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', fontSize: '1.25rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Total Amount</span>
            <span style={{ fontWeight: '700', color: 'var(--success-color)' }}>${booking.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <button className="btn btn-primary btn-block" onClick={handleProceedToPayment}>
          Proceed to Payment (${booking.totalAmount.toFixed(2)})
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
