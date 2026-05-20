import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('taskUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
    }
    setLoading(false);
  }, []);

  const signup = async (name, email, password, role) => {
    const res = await axios.post(`${API_URL}/auth/signup`, { name, email, password, role });
    localStorage.setItem('taskUser', JSON.stringify(res.data));
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    setUser(res.data);
    return res.data;
  };

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    localStorage.setItem('taskUser', JSON.stringify(res.data));
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    setUser(res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('taskUser');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading, API_URL }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};