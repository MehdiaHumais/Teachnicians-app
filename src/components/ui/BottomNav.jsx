import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/buildings', icon: '🏠', label: 'Home', active: location.pathname === '/buildings' },
    { path: '/search', icon: '🔍', label: 'Search', active: location.pathname === '/search' },
    { path: '/profile', icon: '👤', label: 'Profile', active: location.pathname === '/profile' },
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item, index) => (
        <Link key={index} to={item.path} className={`bottom-nav-item ${item.active ? 'active' : ''}`}>
          <span className="bottom-nav-icon">{item.icon}</span>
          <span className="bottom-nav-label">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNav;