import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8083/api/bookings');
      setBookings(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load booking history');
      setLoading(false);
    }
  };
  const [eventForm, setEventForm] = useState({
    name: '', department: '', venue: '', dateTime: '', price: 0, availableTickets: 100, imageUrl: ''
  });
  const [eventSuccess, setEventSuccess] = useState('');
  const [eventError, setEventError] = useState('');

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setEventSuccess('');
    setEventError('');
    try {
      await axios.post('http://localhost:8083/api/event', eventForm);
      setEventSuccess('Event created successfully!');
      setEventForm({ name: '', department: '', venue: '', dateTime: '', price: 0, availableTickets: 100, imageUrl: '' });
      // Clear success message after 3 seconds
      setTimeout(() => setEventSuccess(''), 3000);
    } catch (err) {
      const respData = err.response?.data;
      setEventError(typeof respData === 'string' ? respData : (respData?.message || 'Failed to create event.'));
    }
  };

  if (loading) return <div className="loader"></div>;
  if (error) return <div className="error-text text-center">{error}</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--primary-color)', color: 'white', padding: '0.75rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="21" x2="9" y2="9"/>
          </svg>
        </div>
        <h2 className="title" style={{ margin: 0 }}>Admin Control Panel</h2>
      </div>
      
      <div className="glass-card animate-fade-in delay-1" style={{ marginBottom: '2rem', borderTop: '4px solid var(--primary-color)' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          Publish New Event
        </h3>
        <form onSubmit={handleCreateEvent}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="form-group" style={{ gridColumn: '1 / -1', marginBottom: 0 }}>
              <label className="form-label">Image Banner URL (Optional)</label>
              <input type="url" className="form-control" placeholder="https://images.unsplash.com/..." value={eventForm.imageUrl} onChange={e => setEventForm({...eventForm, imageUrl: e.target.value})} style={{ background: 'rgba(255, 255, 255, 0.5)' }}/>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Event Name</label>
              <input type="text" className="form-control" placeholder="e.g. Tech Symposium" required value={eventForm.name} onChange={e => setEventForm({...eventForm, name: e.target.value})} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Department / Category</label>
              <input type="text" className="form-control" placeholder="e.g. Computer Science" required value={eventForm.department} onChange={e => setEventForm({...eventForm, department: e.target.value})} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Venue Location</label>
              <input type="text" className="form-control" placeholder="e.g. Main Auditorium" required value={eventForm.venue} onChange={e => setEventForm({...eventForm, venue: e.target.value})} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Date & Time</label>
              <input type="datetime-local" className="form-control" required value={eventForm.dateTime} onChange={e => setEventForm({...eventForm, dateTime: e.target.value})} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Ticket Price ($)</label>
              <input type="number" step="0.01" min="0" className="form-control" required value={eventForm.price} onChange={e => setEventForm({...eventForm, price: parseFloat(e.target.value)})} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Capacity (Tickets)</label>
              <input type="number" min="1" className="form-control" required value={eventForm.availableTickets} onChange={e => setEventForm({...eventForm, availableTickets: parseInt(e.target.value)})} />
            </div>
          </div>
          {eventError && <div className="error-text animate-fade-in" style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', marginTop: '1.5rem' }}>{eventError}</div>}
          {eventSuccess && <div className="success-text animate-fade-in" style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success-color)', borderRadius: '8px', marginTop: '1.5rem', fontWeight: '600' }}>{eventSuccess}</div>}
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Publish Event Now
            </button>
          </div>
        </form>
      </div>

      <div className="glass-card animate-fade-in delay-2">
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--secondary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          Recent Booking History
        </h3>
        
        {bookings.length === 0 ? (
          <div className="text-center" style={{ padding: '3rem', background: 'rgba(128, 128, 128, 0.05)', borderRadius: '8px' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p style={{ color: 'var(--text-secondary)' }}>No bookings have been made yet.</p>
          </div>
        ) : (
          <div className="table-container animate-fade-in">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Attendee Name</th>
                  <th>Contact Email</th>
                  <th>Department</th>
                  <th>Event Registered</th>
                  <th>Qty</th>
                  <th>Amount Paid</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking.id} style={{ animation: `fadeInUp 0.3s ease forwards ${(index * 0.05) + 0.3}s`, opacity: 0 }}>
                    <td style={{ color: 'var(--text-secondary)' }}>#{booking.id}</td>
                    <td style={{ fontWeight: '600' }}>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td><span style={{ padding: '0.2rem 0.6rem', background: 'rgba(128, 128, 128, 0.1)', borderRadius: '20px', fontSize: '0.8rem' }}>{booking.department}</span></td>
                    <td style={{ fontWeight: '500' }}>{booking.event ? booking.event.name : 'Unknown'}</td>
                    <td>
                      <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: 'var(--secondary-color)', padding: '0.3rem 0.8rem', borderRadius: '1rem', fontSize: '0.85rem', fontWeight: '700' }}>
                        {booking.ticketsBooked}
                      </span>
                    </td>
                    <td style={{ color: 'var(--success-color)', fontWeight: '700' }}>
                      ${booking.totalAmount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
