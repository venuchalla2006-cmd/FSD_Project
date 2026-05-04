import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TicketBookingForm = ({ user }) => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    ticketsBooked: 1
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/api/event/${eventId}`);
      setEvent(response.data);
    } catch (err) {
      console.error('Failed to fetch event details', err);
    }
  };

  const getImageForEvent = (id) => {
    const images = [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80", 
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80", 
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80", 
      "https://images.unsplash.com/photo-1588196749597-9ff046892e08?auto=format&fit=crop&w=800&q=80", 
      "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=800&q=80"
    ];
    return images[(id || 0) % images.length];
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is mandatory';
    if (!formData.email) {
      newErrors.email = 'Email is mandatory';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!formData.department) newErrors.department = 'Department is mandatory';
    if (formData.ticketsBooked <= 0) newErrors.ticketsBooked = 'Must book at least 1 ticket';
    if (event && formData.ticketsBooked > event.availableTickets) {
      newErrors.ticketsBooked = `Cannot book more than ${event.availableTickets} tickets`;
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const payload = {
        ...formData,
        username: user.username,
        event: { id: parseInt(eventId) },
        totalAmount: formData.ticketsBooked * event.price
      };
      
      navigate('/summary', { state: { booking: payload, event: event } });
    } catch (err) {
      setErrors({ submit: 'An error occurred while continuing' });
    } finally {
      setLoading(false);
    }
  };

  if (!event) return <div className="loader"></div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <button className="btn btn-secondary" onClick={() => navigate('/')} style={{ marginBottom: '2rem', padding: '0.5rem 1rem' }}>
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '0.5rem', display: 'inline' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Events
      </button>

      <div className="card" style={{ display: 'flex', flexDirection: window.innerWidth > 768 ? 'row' : 'column' }}>
        {/* Left Side: Event Info */}
        <div style={{ flex: 1, backgroundColor: 'var(--card-bg)', borderRight: '1px solid var(--border-color)' }}>
          <img src={event.imageUrl || getImageForEvent(event.id)} alt={event.name} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
          <div style={{ padding: '2rem' }}>
            <span className="text-secondary" style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.05em' }}>{event.department}</span>
            <h2 style={{ margin: '0.5rem 0 1rem 0', fontSize: '1.5rem' }}>{event.name}</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>{new Date(event.dateTime).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>{event.venue}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-primary)' }}>${event.price.toFixed(2)}</span>
                  <span>per ticket</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: '600', color: 'var(--primary-color)' }}>{event.availableTickets}</span>
                  <span>available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div style={{ flex: 1, padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Checkout Details</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-control"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Department</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="e.g. Engineering"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
              />
              {errors.department && <p className="error-text">{errors.department}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Quantity</label>
              <select 
                className="form-control"
                value={formData.ticketsBooked}
                onChange={(e) => setFormData({...formData, ticketsBooked: parseInt(e.target.value) || 1})}
              >
                {[...Array(Math.min(10, event.availableTickets))].map((_, i) => (
                  <option key={i+1} value={i+1}>{i+1} Ticket{i > 0 ? 's' : ''}</option>
                ))}
              </select>
              {errors.ticketsBooked && <p className="error-text">{errors.ticketsBooked}</p>}
            </div>

            {/* Total Calculation */}
            <div style={{ marginTop: '2rem', marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '500' }}>Order Total</span>
              <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                ${(formData.ticketsBooked * event.price).toFixed(2)}
              </span>
            </div>

            {errors.submit && <p className="error-text" style={{ marginBottom: '1rem', textAlign: 'center' }}>{typeof errors.submit === 'string' ? errors.submit : 'An error occurred'}</p>}

            <button type="submit" className="btn btn-primary btn-block" disabled={loading || event.availableTickets <= 0}>
              {loading ? 'Processing...' : 'Continue to Summary'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketBookingForm;
