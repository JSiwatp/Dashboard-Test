import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; // Create this CSS file for styling
import { Link } from 'react-router-dom';

interface NavbarProps {
  onLogout: () => void;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout, toggleSidebar }) => {
  return (
    <nav className="navbar navbar-light custom_nav">
      <i className="bi bi-list custom_nav-btn" onClick={toggleSidebar}></i>
      <button className="navbar-brand ml-auto nav-item" onClick={onLogout}>
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;
