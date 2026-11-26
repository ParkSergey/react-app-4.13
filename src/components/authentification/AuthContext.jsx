import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);


function readUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return {
    token,
    username: localStorage.getItem('username'),
    image: localStorage.getItem('userImage'),
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);


  function login(data) {
    const token = data.token || localStorage.getItem('token');
    localStorage.setItem('token', token);

    if (data.username) {
      localStorage.setItem('username', data.username);
    } else {
      localStorage.removeItem('username');
    }
    if (data.image) {
      localStorage.setItem('userImage', data.image);
    } else {
      localStorage.removeItem('userImage');
    }

    setUser({
      token,
      username: data.username || null,
      image: data.image || null,
    });
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userImage');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
