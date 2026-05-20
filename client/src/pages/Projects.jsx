import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Projects = () => {
  const { user, API_URL } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    fetchProjects();
    if (user.role === 'Admin') fetchTeam();
  }, []);

  const fetchProjects = async () => {
    const res = await axios.get(`${API_URL}/projects`);
    setProjects(res.data);
  };

  const fetchTeam = async () => {
    const res = await axios.get(`${API_URL}/auth/team`);
    setTeam(res.data.filter(u => u.id !== user.id));
  };

  const handleMemberToggle = (id) => {
    setSelectedMembers(prev => 
      prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
    );
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/projects`, { name, description, members: selectedMembers });
      setName(''); setDescription(''); setSelectedMembers([]);
      fetchProjects();
    } catch (err) {
      alert('Failed creating new project module configuration.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Project Workspace Spaces</h1>
      <div className="grid-layout" style={{ marginTop: '1.5rem' }}>
        {user.role === 'Admin' && (
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px' }}>
            <h3>Configure New Project</h3>
            <form onSubmit={handleCreate} style={{ marginTop: '1rem' }}>
              <label>Project Scope Name</label>
              <input type="text" className="input-field" value={name} onChange={(e) => setName(e.target.value)} required />
              <label>Functional Description</label>
              <textarea className="input-field" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required />
              
              <label>Assign Team Members</label>
              <div style={{ maxHeight: '120px', overflowY: 'auto', border: '1px solid #cbd5e1', padding: '0.5rem', borderRadius: '6px', marginBottom: '1.5rem' }}>
                {team.map(t => (
                  <div key={t.id} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <input type="checkbox" checked={selectedMembers.includes(t.id)} onChange={() => handleMemberToggle(t.id)} />
                    <span style={{ fontSize: '0.9rem' }}>{t.name} ({t.role})</span>
                  </div>
                ))}
              </div>
              <button type="submit" className="btn">Instantiate Project</button>
            </form>
          </div>
        )}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {projects.map(p => (
            <div key={p.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)' }}>
              <h2>{p.name}</h2>
              <p style={{ color: '#475569', margin: '0.5rem 0 1rem 0' }}>{p.description}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {p.members?.map(m => (
                  <span key={m.id} style={{ background: '#f1f5f9', fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>{m.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;