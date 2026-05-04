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
    <div style={{ maxWidth: '450px', margin: '6rem auto' }} className="animate-fade-in">
      <div className="glass-card" style={{ padding: '2.5rem', boxShadow: 'var(--shadow-neon)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            width: '60px', height: '60px', borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            margin: '0 auto 1rem', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
            animation: 'pulseGlow 3s infinite'
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <h2 className="title" style={{ fontSize: '2rem', background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Please enter your details to sign in.</p>
        </div>
        
        {!showOtp ? (
          <form onSubmit={handleLogin} className="animate-fade-in delay-1">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input 
                type="text" 
                className="form-control" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
                disabled={loading}
                placeholder="Enter your username"
                style={{ transition: 'all 0.3s ease' }}
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
                placeholder="••••••••"
                style={{ transition: 'all 0.3s ease' }}
              />
            </div>
            {error && <p className="error-text animate-fade-in" style={{ marginBottom: '1rem', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px', textAlign: 'center' }}>{error}</p>}
            <button type="submit" className="btn btn-primary btn-block" disabled={loading} style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="animate-fade-in delay-1">
            <div className="form-group">
              <label className="form-label" style={{ textAlign: 'center', fontSize: '1.1rem' }}>Security Verification</label>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', textAlign: 'center' }}>
                We've sent a 6-digit code to your email.
              </p>
              <input 
                type="text" 
                className="form-control" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required 
                maxLength="6"
                disabled={loading}
                placeholder="000000"
                style={{ letterSpacing: '0.75em', textAlign: 'center', fontSize: '1.5rem', padding: '1rem' }}
              />
            </div>
            {error && <p className="error-text animate-fade-in" style={{ marginBottom: '1rem', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px', textAlign: 'center' }}>{error}</p>}
            <button type="submit" className="btn btn-primary btn-block" disabled={loading || otp.length < 6} style={{ width: '100%', padding: '0.85rem' }}>
              {loading ? 'Verifying...' : 'Verify & Proceed'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary btn-block" 
              onClick={() => { setShowOtp(false); setOtp(''); setError(''); }}
              disabled={loading}
              style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }}
            >
              Back to Login
            </button>
          </form>
        )}

        <div className="animate-fade-in delay-2" style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Don't have an account? </span>
          <Link to="/signup" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '700', transition: 'color 0.2s' }}>Create one</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
