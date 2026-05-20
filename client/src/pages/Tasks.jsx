import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Tasks = () => {
  const { user, API_URL } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState([]);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [assignedToId, setAssignedToId] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    fetchTasks();
    if (user.role === 'Admin') {
      fetchProjects();
      fetchTeam();
    }
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(`${API_URL}/tasks`);
    setTasks(res.data);
  };

  const fetchProjects = async () => {
    const res = await axios.get(`${API_URL}/projects`);
    setProjects(res.data);
  };

  const fetchTeam = async () => {
    const res = await axios.get(`${API_URL}/auth/team`);
    setTeam(res.data);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/tasks`, { title, description, projectId, assignedToId, dueDate });
      setTitle(''); setDescription(''); setProjectId(''); setAssignedToId(''); setDueDate('');
      fetchTasks();
    } catch (err) {
      alert('Error creating target task.');
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const workflow = ['To Do', 'In Progress', 'Done'];
    const nextStatus = workflow[(workflow.indexOf(currentStatus) + 1) % workflow.length];
    try {
      await axios.patch(`${API_URL}/tasks/${id}/status`, { status: nextStatus });
      fetchTasks();
    } catch (err) {
      alert('Status change execution failed.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Task Control Center</h1>
      <div className="grid-layout" style={{ marginTop: '1.5rem' }}>
        {user.role === 'Admin' && (
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px' }}>
            <h3>Create Lifecycle Task</h3>
            <form onSubmit={handleCreateTask} style={{ marginTop: '1rem' }}>
              <label>Task Title</label>
              <input type="text" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <label>Description</label>
              <textarea className="input-field" value={description} onChange={(e) => setDescription(e.target.value)} />
              
              <label>Target Project Module</label>
              <select className="input-field" value={projectId} onChange={(e) => setProjectId(e.target.value)} required>
                <option value="">Select Project</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>

              <label>Assign Responsibility To</label>
              <select className="input-field" value={assignedToId} onChange={(e) => setAssignedToId(e.target.value)} required>
                <option value="">Select Owner</option>
                {team.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>

              <label>Due Date Constraint</label>
              <input type="date" className="input-field" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
              
              <button type="submit" className="btn">Dispatch Task</button>
            </form>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tasks.map(t => (
            <div key={t.id} style={{ background: 'white', padding: '1.25rem', borderRadius: '8px', borderLeft: `6px solid ${t.status === 'Done' ? '#22c55e' : t.status === 'In Progress' ? '#eab308' : '#64748b'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4>{t.title}</h4>
                <button onClick={() => handleStatusChange(t.id, t.status)} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>
                  {t.status}
                </button>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#475569', margin: '0.5rem 0' }}>{t.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
                <span>Project: <strong>{t.project?.name}</strong></span>
                <span>Due: {new Date(t.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;