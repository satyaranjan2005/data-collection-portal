import React from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

const Layout = ({ children }) => {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <main style={{
          flex: 1,
          padding: '2rem',
          overflow: 'auto',
          background: '#ffffff'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
