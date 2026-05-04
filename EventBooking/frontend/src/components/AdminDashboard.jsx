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
    <div>
      <h2 className="title">Admin Dashboard</h2>
      
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Create New Event</h3>
        <form onSubmit={handleCreateEvent}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Image URL (Optional)</label>
              <input type="url" className="form-control" placeholder="https://example.com/image.jpg" value={eventForm.imageUrl} onChange={e => setEventForm({...eventForm, imageUrl: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Event Name</label>
              <input type="text" className="form-control" required value={eventForm.name} onChange={e => setEventForm({...eventForm, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <input type="text" className="form-control" required value={eventForm.department} onChange={e => setEventForm({...eventForm, department: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Venue</label>
              <input type="text" className="form-control" required value={eventForm.venue} onChange={e => setEventForm({...eventForm, venue: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Date & Time (YYYY-MM-DDTHH:MM)</label>
              <input type="datetime-local" className="form-control" required value={eventForm.dateTime} onChange={e => setEventForm({...eventForm, dateTime: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Price ($)</label>
              <input type="number" step="0.01" min="0" className="form-control" required value={eventForm.price} onChange={e => setEventForm({...eventForm, price: parseFloat(e.target.value)})} />
            </div>
            <div className="form-group">
              <label className="form-label">Available Tickets</label>
              <input type="number" min="1" className="form-control" required value={eventForm.availableTickets} onChange={e => setEventForm({...eventForm, availableTickets: parseInt(e.target.value)})} />
            </div>
          </div>
          {eventError && <p className="error-text">{eventError}</p>}
          {eventSuccess && <p className="success-text">{eventSuccess}</p>}
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Publish Event</button>
        </form>
      </div>

      <div className="glass-card">
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Booking History</h3>
        
        {bookings.length === 0 ? (
          <p className="text-center" style={{ color: 'var(--text-secondary)' }}>No bookings found.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Event Name</th>
                  <th>Tickets</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>#{booking.id}</td>
                    <td style={{ fontWeight: '500' }}>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.department}</td>
                    <td>{booking.event ? booking.event.name : 'Unknown'}</td>
                    <td>
                      <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--primary-color)', padding: '0.2rem 0.5rem', borderRadius: '1rem', fontSize: '0.85rem', fontWeight: '600' }}>
                        {booking.ticketsBooked}
                      </span>
                    </td>
                    <td style={{ color: 'var(--success-color)', fontWeight: '600' }}>
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
