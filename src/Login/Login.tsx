import React, { useState } from 'react';
import { mockCredentials } from '../data';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

interface LoginProps {
  onLoginSuccess: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === mockCredentials.username && password === mockCredentials.password) {
      const user = { name: username };
      onLoginSuccess(user);
      navigate('/Dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="box_container">
      <div className="header_login">
        <h2>Hello !</h2>
        <h2>This web site is for SolidiThai test</h2>
      </div>
      <div className="wrapper">
      <div className="header">
        <h2 className="title">Login</h2>
        <div className="underline"></div>
      </div>
      {error && <p className="error-message">{error}</p>}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="d-flex justify-content-center">
          <button className="custom-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
      
      </div>
    </div>
  );
};


export default Login