import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';

interface SidebarProps {
  username: string;
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ username, isSidebarOpen, closeSidebar }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-content">
        <div className="icon-container">
          <i className="bi bi-person-circle custom-icon"></i>
          <p className="text-muted mt-2">Welcome!, <strong>{username}</strong></p>
        </div>
        <hr className="divider" />
        <ul className="flex-column p-3 menu-sidebar_items">
          <li className="sidebar-items">
              <i className="bi bi-clipboard-data-fill"></i>
              <span className="ms-2">Dashboard</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
