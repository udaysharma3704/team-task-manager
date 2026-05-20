import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication collapsed.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Sign In</h2>
        {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password</label>
          <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn">Login</button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
          Need an account? <Link to="/signup" style={{ color: '#2563eb' }}>Create one here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;