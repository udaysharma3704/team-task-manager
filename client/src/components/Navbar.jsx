import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CheckSquare, LogOut, Folder, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav style={{ backgroundColor: '#1e293b', color: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
        <CheckSquare size={24} /> <span>TeamFlow SQL</span>
      </Link>
      
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/" style={{ color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><LayoutDashboard size={18}/> Dashboard</Link>
          <Link to="/projects" style={{ color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Folder size={18}/> Projects</Link>
          <Link to="/tasks" style={{ color: '#cbd5e1', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckSquare size={18}/> Tasks</Link>
          <span style={{ backgroundColor: '#334155', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.85rem' }}>{user.name} ({user.role})</span>
          <button onClick={() => { logout(); navigate('/login'); }} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: '600' }}><LogOut size={18} /> Exit</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;