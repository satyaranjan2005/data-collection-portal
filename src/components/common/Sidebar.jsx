import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import { USER_MENU_ITEMS, ADMIN_MENU_ITEMS } from '../../utils/constants.js';
import * as Icons from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const menuItems = isAdmin ? ADMIN_MENU_ITEMS : USER_MENU_ITEMS;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside style={{
      width: '250px',
      background: '#f8f9fa',
      borderRight: '1px solid #e9ecef',
      height: '100vh',
      overflowY: 'auto'
    }}>
      <nav style={{ padding: '1rem 0' }}>
        {menuItems.map((item) => {
          const IconComponent = Icons[item.icon];
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                border: 'none',
                background: isActive ? '#667eea' : 'transparent',
                color: isActive ? 'white' : '#333',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.95rem',
                transition: 'all 0.3s',
                borderLeft: isActive ? '4px solid #5a6fd8' : '4px solid transparent'
              }}
              onMouseOver={(e) => {
                if (!isActive) {
                  e.target.style.background = '#e9ecef';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              {IconComponent && <IconComponent size={18} />}
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
