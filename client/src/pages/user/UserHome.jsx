import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./userdashboard.css";

const UserHome = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 2,
    pending: 1,
    closed: 1
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail") || localStorage.getItem("email");
        const res = await axios.get('http://localhost:5000/api/complaints/show');
        if (res.data && res.data.Complaint) {
          const allComplaints = res.data.Complaint;
          if (userEmail) {
            const userComplaints = allComplaints.filter(c => c.userEmail === userEmail);
            const pending = userComplaints.filter(c => c.status === 'pending' || c.status === 'not-processed').length;
            const closed = userComplaints.filter(c => c.status === 'closed').length;
            setStats({
              total: userComplaints.length,
              pending: pending,
              closed: closed
            });
          } else {
            const total = allComplaints.length || 2;
            const pending = allComplaints.filter(c => c.status === 'pending' || c.status === 'not-processed').length || 1;
            const closed = allComplaints.filter(c => c.status === 'closed').length || 1;
            setStats({ total, pending, closed });
          }
        }
      } catch (err) {
        console.error("Error fetching user complaints stats:", err);
      }
    };
    fetchUserStats();
  }, []);

  return (
    <div className="row g-4 mt-2">
      {/* Card 1: My Complaints */}
      <div className="col-12 col-md-4">
        <div className="portal-card">
          <div className="card-badge">
            <span>User's</span>
            <span className="card-badge-count">{stats.total}</span>
          </div>
          <h3>My Complaints</h3>
          <div className="portal-card-icon" style={{ color: '#e91e63' }}>
            <i className="bi bi-people-fill"></i>
          </div>
          <button className="portal-card-btn" onClick={() => navigate('/user/my-complaints')}>Check</button>
        </div>
      </div>

      {/* Card 2: Pending Complaints */}
      <div className="col-12 col-md-4">
        <div className="portal-card">
          <div className="card-badge">
            <span>Pending</span>
            <span className="card-badge-count">{stats.pending}</span>
          </div>
          <h3>Pending Complaints</h3>
          <div className="portal-card-icon" style={{ color: '#dc3545' }}>
            <i className="bi bi-clock"></i>
          </div>
          <button className="portal-card-btn" onClick={() => navigate('/user/pending')}>Check</button>
        </div>
      </div>

      {/* Card 3: Closed Complaints */}
      <div className="col-12 col-md-4">
        <div className="portal-card">
          <div className="card-badge">
            <span>Closed Comp.</span>
            <span className="card-badge-count">{stats.closed}</span>
          </div>
          <h3>Closed Complaints</h3>
          <div className="portal-card-icon" style={{ color: '#dc3545' }}>
            <i className="bi bi-exclamation-circle-fill"></i>
          </div>
          <button className="portal-card-btn" onClick={() => navigate('/user/closed')}>Check</button>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
