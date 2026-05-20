import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ShieldAlert, CheckCircle, BarChart3, Clock } from 'lucide-react';

const Dashboard = () => {
  const { API_URL } = useContext(AuthContext);
  const [stats, setStats] = useState({ total: 0, todo: 0, inProgress: 0, done: 0, overdue: 0 });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(`${API_URL}/tasks/dashboard-analytics`);
        setStats(res.data);
      } catch (err) {
        console.error('Failed fetching analytics block metrics.');
      }
    };
    fetchAnalytics();
  }, [API_URL]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Performance Dashboard Metrics</h1>
      <div className="dashboard-grid">
        <div className="stat-card" style={{ borderLeftColor: '#2563eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><p>Total Tracked</p><BarChart3 color="#2563eb"/></div>
          <h2>{stats.total}</h2>
        </div>
        <div className="stat-card" style={{ borderLeftColor: '#eab308' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><p>In Progress</p><Clock color="#eab308"/></div>
          <h2>{stats.inProgress}</h2>
        </div>
        <div className="stat-card" style={{ borderLeftColor: '#22c55e' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><p>Completed</p><CheckCircle color="#22c55e"/></div>
          <h2>{stats.done}</h2>
        </div>
        <div className="stat-card" style={{ borderLeftColor: '#ef4444' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><p>Overdue System Units</p><ShieldAlert color="#ef4444"/></div>
          <h2 style={{ color: stats.overdue > 0 ? '#ef4444' : 'inherit' }}>{stats.overdue}</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;