import { useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [role, setRole] = useState<'admin' | 'cliente' | null>(
    localStorage.getItem('role') as 'admin' | 'cliente' | null
  );
  const [nombre, setNombre] = useState<string | null>(localStorage.getItem('nombre'));

  const login = async (email: string, password: string) => {

    if ((email === 'admin' || email === 'admin@test.com') &&
      password === 'admin123'
    ) {
      saveAuth('fake-jwt-admin', 'admin', 'Administrador');
      return true;
    } else if ((email === 'cliente' || email === 'cliente@test.com') &&
      password === 'cliente123'
    ) {
      saveAuth('fake-jwt-cliente', 'cliente', 'Cliente Demo');
      return true;
    }
    return false;
  };

  const saveAuth = (token: string, role: 'admin' | 'cliente', nombre: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('nombre', nombre);
    setToken(token);
    setRole(role);
    setNombre(nombre);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('nombre');
    setToken(null);
    setRole(null);
    setNombre(null);
  };
  
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, role, nombre, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};