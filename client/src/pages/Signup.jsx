import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Member');
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password, role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration collapsed.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Create Account</h2>
        {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input type="text" className="input-field" value={name} onChange={(e) => setName(e.target.value)} required />
          <label>Email Address</label>
          <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password</label>
          <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <label>System Privilege Role</label>
          <select className="input-field" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Member">Member (Track Tasks)</option>
            <option value="Admin">Admin (Create & Assign)</option>
          </select>
          <button type="submit" className="btn">Register</button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
          Existing member? <Link to="/login" style={{ color: '#2563eb' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;