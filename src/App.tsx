import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';


interface User {
  name: string;
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleLoginSuccess = (user: User) => {
    setIsLoggedIn(true);
    setLoggedInUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    localStorage.removeItem('user'); 
    localStorage.removeItem('hasSeenGreeting');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={!isLoggedIn ? <Login onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} username={loggedInUser?.name ?? ''} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
