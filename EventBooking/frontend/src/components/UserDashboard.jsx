import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyBookings();
  }, [user]);

  const fetchMyBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/api/bookings/user/${user.username}`);
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load your tickets.');
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div className="loader"></div>;
  if (error) return <div className="error-text text-center">{error}</div>;

  return (
    <div>
      <div className="hero" style={{ padding: '2rem 0', marginBottom: '1rem' }}>
        <h2 className="title" style={{ fontSize: '3rem', margin: 0 }}>My Tickets</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          Your digital boarding passes.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="glass-card text-center" style={{ padding: '4rem 2rem', borderStyle: 'dashed', borderColor: '#cbd5e1' }}>
          <div style={{ fontSize: '4rem', opacity: 0.5, marginBottom: '1rem' }}>🎫</div>
          <h3 style={{ color: 'var(--text-primary)' }}>No tickets found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>You haven't booked any festivals yet.</p>
        </div>
      ) : (
        <>
          <div className="text-center" style={{ marginBottom: '2rem' }}>
            <button className="btn btn-secondary" onClick={handlePrint}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
              Print / Save Tickets
            </button>
          </div>
          <div className="events-grid">
            {bookings.map(booking => (
              <div key={booking.id} className="glass-card ticket-print-area" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', padding: '2rem', textAlign: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', width: '30px', height: '30px', background: 'var(--bg-color)', borderRadius: '50%', border: '1px solid var(--border-color)', borderTopColor: 'transparent' }}></div>
                  <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'white', fontWeight: 800, letterSpacing: '0.05em' }}>
                    {booking.event ? booking.event.name : 'AuraTix Event'}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: '0.85rem', marginTop: '0.25rem' }}>VIP ACCESS</p>
                </div>
                <div style={{ padding: '2rem' }}>
                  <p style={{ color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
                    PASS #{booking.id.toString().padStart(6, '0')}
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <p style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Holder</p>
                      <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{booking.name}</p>
                    </div>
                    <div>
                      <p style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Group</p>
                      <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{booking.department}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px dashed #e2e8f0' }}>
                    <div>
                      <p style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Admit</p>
                      <p style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--text-primary)' }}>{booking.ticketsBooked}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Paid</p>
                      <p style={{ fontWeight: '700', color: 'var(--success-color)' }}>${booking.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
