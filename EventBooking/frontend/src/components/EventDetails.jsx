import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://fsd-project-2-gwhu.onrender.com/api/event');
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch events.');
      setLoading(false);
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

  const departments = [...new Set(events.map(e => e.department))].filter(Boolean);

  if (loading) return <div className="loader"></div>;
  if (error) return <div className="error-text text-center">{error}</div>;

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === '' || e.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div style={{ margin: '-2rem' }}> {/* Offset container padding for full width sections */}
      
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">DISCOVER THE BEST <span className="text-red">COLLEGE FESTS</span> ON CAMPUS</h1>
          <p className="hero-subtitle">Search events. Register with your college ID. Compete and win.</p>
          
          <div className="horizontal-search-bar">
            <div className="search-field">
              <label>Search Event</label>
              <input 
                type="text" 
                placeholder="Name or keyword..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="search-field">
              <label>Select Department</label>
              <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                <option value="">All Departments</option>
                {departments.map((dept, i) => <option key={i} value={dept}>{dept}</option>)}
              </select>
            </div>
            <button className="btn btn-blue" style={{ margin: '0.25rem', padding: '0.75rem 2rem' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* 2. SPLIT FEATURE SECTION */}
      <section className="split-section container">
        <div className="split-grid">
          
          {/* Left: Text & Features */}
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>
              The Ultimate <span className="text-white">College Event Solution</span> with Industry's Best Features!
            </h2>
            <p className="text-secondary" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              Create, Manage and Register for Events Online for <span className="text-red" style={{ fontWeight: 600 }}>Any College Fest</span>. A trusted ticketing system for all your campus needs.
            </p>
            
            <ul className="feature-list">
              <li>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Fast easy setup
              </li>
              <li>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Customizable ID passes
              </li>
              <li>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                No hidden entry fees
              </li>
              <li>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Comprehensive reporting
              </li>
              <li>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Every feature imaginable
              </li>
              <li>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Free certification
              </li>
            </ul>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})}>Explore Events</button>
            </div>
          </div>

          {/* Right: 2x2 Image Grid */}
          <div className="category-gallery">
            <div className="category-card" onClick={() => setSelectedDept('CS')}>
              <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80" alt="Tech" />
              <div className="category-pill-label">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
                Tech Symposium
              </div>
            </div>
            <div className="category-card" onClick={() => setSelectedDept('EC')}>
              <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80" alt="Cultural" />
              <div className="category-pill-label">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" /></svg>
                Cultural Fest
              </div>
            </div>
            <div className="category-card" onClick={() => setSelectedDept('IT')}>
              <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80" alt="Hackathon" />
              <div className="category-pill-label">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" /></svg>
                Hackathons
              </div>
            </div>
            <div className="category-card" onClick={() => setSelectedDept('MECH')}>
              <img src="https://images.unsplash.com/photo-1588196749597-9ff046892e08?auto=format&fit=crop&w=600&q=80" alt="Workshops" />
              <div className="category-pill-label">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" /></svg>
                Workshops
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. UPCOMING EVENTS GRID */}
      <section className="container" style={{ paddingTop: '0' }}>
        <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>All <span className="text-red">Upcoming Events</span></h2>
        
        {filteredEvents.length === 0 ? (
          <div className="glass-card text-center" style={{ padding: '4rem 2rem', borderStyle: 'dashed' }}>
            <p className="text-secondary" style={{ fontSize: '1.125rem' }}>No events found matching your search.</p>
            <button className="btn btn-secondary" style={{ marginTop: '1rem' }} onClick={() => { setSearchTerm(''); setSelectedDept(''); }}>Clear Filters</button>
          </div>
        ) : (
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <div key={event.id} className="glass-card event-card" onClick={() => navigate(`/book/${event.id}`)}>
                <img src={event.imageUrl || getImageForEvent(event.id)} alt={event.name} className="event-image" />
                <div className="event-content">
                  <span className="event-department">{event.department}</span>
                  <h3 className="event-title">{event.name}</h3>
                  <div className="event-details">
                    <p>
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {new Date(event.dateTime).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p>
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      {event.venue}
                    </p>
                  </div>
                  <div className="event-footer">
                    <span className="event-price">${event.price.toFixed(2)}</span>
                    <button 
                      className={`btn ${event.availableTickets > 0 ? 'btn-primary' : 'btn-secondary'}`}
                      disabled={event.availableTickets <= 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (event.availableTickets > 0) navigate(`/book/${event.id}`);
                      }}
                    >
                      {event.availableTickets > 0 ? 'Register Now' : 'Sold Out'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default EventDetails;
