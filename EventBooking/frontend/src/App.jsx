import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import EventDetails from './components/EventDetails';
import TicketBookingForm from './components/TicketBookingForm';
import BookingSummary from './components/BookingSummary';
import Payment from './components/Payment';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

function App() {
  const [user, setUser] = useState(null); // null, { username: '...', role: 'USER' | 'ADMIN' }
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-brand">AuraTix</Link>
        <div className="nav-links">
          
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme" style={{ marginRight: '0.5rem' }}>
            {theme === 'light' ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            )}
          </button>

          {user ? (
            <>
              <span className="text-secondary" style={{ marginRight: '0.5rem' }}>Welcome, {user.username}</span>
              {user.role === 'ADMIN' && (
                <Link to="/admin" className="nav-link">Dashboard</Link>
              )}
              {user.role === 'USER' && (
                <>
                  <Link to="/" className="nav-link">Events</Link>
                  <Link to="/my-tickets" className="nav-link">My Tickets</Link>
                </>
              )}
              <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.4rem 1rem', marginLeft: '0.5rem' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Log in</Link>
              <Link to="/signup" className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Sign up</Link>
            </>
          )}
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* User Routes */}
          <Route path="/" element={user?.role === 'USER' ? <EventDetails /> : <Navigate to="/login" />} />
          <Route path="/book/:eventId" element={user?.role === 'USER' ? <TicketBookingForm user={user} /> : <Navigate to="/login" />} />
          <Route path="/summary" element={user?.role === 'USER' ? <BookingSummary /> : <Navigate to="/login" />} />
          <Route path="/payment" element={user?.role === 'USER' ? <Payment /> : <Navigate to="/login" />} />
          <Route path="/my-tickets" element={user?.role === 'USER' ? <UserDashboard user={user} /> : <Navigate to="/login" />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={user?.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
