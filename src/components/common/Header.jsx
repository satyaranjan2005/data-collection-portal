import React from 'react';
import { useAuth } from '../../hooks/useAuth.jsx';
import { LogOut, User, Shield } from 'lucide-react';

const Header = () => {
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header style={{
      background: '#667eea',
      color: 'white',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
          Data Collection Portal
        </h1>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isAdmin ? (
            <Shield size={20} />
          ) : (
            <User size={20} />
          )}
          <span style={{ fontWeight: 'bold' }}>
            {user?.name || user?.username}
          </span>
          {isAdmin && (
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '0.25rem 0.5rem',
              borderRadius: '3px',
              fontSize: '0.8rem'
            }}>
              Admin
            </span>
          )}
        </div>
        
        <button
          onClick={handleLogout}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
