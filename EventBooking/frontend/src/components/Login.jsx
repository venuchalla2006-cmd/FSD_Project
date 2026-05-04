import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8083/api/login', {
        username,
        password
      });

      const data = response.data;
      if (data.requiresOtp) {
        setShowOtp(true);
      } else {
        // Fallback if OTP is not required
        setUser(data);
        if (data.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.response?.data || 'Invalid credentials or server unreachable');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8083/api/verify-otp', {
        username,
        otp
      });

      const userData = response.data;
      setUser(userData);
      
      if (userData.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <div className="glass-card">
        <h2 className="title" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>System Login</h2>
        
        {!showOtp ? (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input 
                type="text" 
                className="form-control" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                disabled={loading}
              />
            </div>
            {error && <p className="error-text" style={{ marginBottom: '1rem' }}>{error}</p>}
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="form-group">
              <label className="form-label">Enter 6-digit OTP</label>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                We've sent an OTP to your email. Please enter it below.
              </p>
              <input 
                type="text" 
                className="form-control" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required 
                maxLength="6"
                disabled={loading}
                style={{ letterSpacing: '0.5em', textAlign: 'center', fontSize: '1.25rem' }}
              />
            </div>
            {error && <p className="error-text" style={{ marginBottom: '1rem' }}>{error}</p>}
            <button type="submit" className="btn btn-primary btn-block" disabled={loading || otp.length < 6}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary btn-block" 
              onClick={() => { setShowOtp(false); setOtp(''); setError(''); }}
              disabled={loading}
              style={{ marginTop: '1rem' }}
            >
              Back to Login
            </button>
          </form>
        )}

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Don't have an account? </span>
          <Link to="/signup" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '500' }}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
