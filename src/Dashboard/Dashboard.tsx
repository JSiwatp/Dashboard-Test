import React, { useState, useEffect } from 'react';
import { users } from '../data';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import "./Dashboard.css";

interface DashboardProps {
  onLogout: () => void;
  username: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, username }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false); // Initial state is false

  useEffect(() => {
    const hasSeenGreeting = localStorage.getItem('hasSeenGreeting') === 'true';

    if (!hasSeenGreeting) {
      setShowGreeting(true);
      localStorage.setItem('hasSeenGreeting', 'true');
    }
  }, []);

  useEffect(() => {
    if (showGreeting) {
      const timer = setTimeout(() => {
        setShowGreeting(false);
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [showGreeting]);

  const handleClose = () => setShowModal(false);
  const handleShow = (user: any) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name} ${user.email} ${user.job}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div>
      <Navbar onLogout={onLogout} toggleSidebar={toggleSidebar} />
      <Sidebar username={username} isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      <div className={`dashboard-content ${isSidebarOpen ? 'content-shift' : ''}`}>
        <div className="dash_container">
          <h1 className="mt-4">Dashboard</h1>
          <div className="table_content">
            <div className="head_table d-flex justify-content-between align-items-center mb-3 px-3">
              <p className="mb-0">List of users</p>
              <div className="search_box d-flex align-items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control search_dashboard"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="bi bi-search ms-2 search_icon"></i>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover table-striped table-sm custom-table">
                <thead className="table-light">
                  <tr>
                    <th scope="col" className="p-3">NO</th>
                    <th scope="col" className="p-3">Name</th>
                    <th scope="col" className="p-3">Surname</th>
                    <th scope="col" className="p-3">Email</th>
                    <th scope="col" className="p-3">Job</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center p-3">
                        No item.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user, index) => (
                      <tr key={user.id} onClick={() => handleShow(user)}>
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">{user.first_name}</td>
                        <td className="p-3">{user.last_name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{user.job}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {selectedUser && (
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label"><strong>Name:</strong></label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" value={`${selectedUser.first_name} ${selectedUser.last_name}`} disabled />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label"><strong>Email:</strong></label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" value={selectedUser.email} disabled />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label"><strong>Gender:</strong></label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" value={selectedUser.gender} disabled />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label"><strong>Phone:</strong></label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" value={selectedUser.phone} disabled />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label"><strong>City:</strong></label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" value={selectedUser.city} disabled />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label"><strong>Job:</strong></label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" value={selectedUser.job} disabled />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
            </Modal.Footer>
          </Modal>
        )}

        {showGreeting && (
           <Modal show={showGreeting} onHide={() => setShowGreeting(false)} centered>
           <Modal.Body className="text-center d-flex align-items-center justify-content-center custom-modal-grt">
             <p style={{ fontSize: "1.25rem", textAlign: "center", margin: 0 }}>
               Welcome to the Dashboard, {username}!<i className="bi bi-emoji-smile-fill" style={{marginLeft:"10px",fontSize:"25px"}}></i>
             </p>
           </Modal.Body>
         </Modal>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
