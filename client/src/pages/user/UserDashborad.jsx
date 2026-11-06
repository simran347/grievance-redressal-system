import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./userdashboard.css";

const UserDashborad = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [stats, setStats] = useState({
    total: 2,
    pending: 1,
    closed: 1
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  const getGreeting = () => {
    const hrs = time.getHours();
    if (hrs < 12) return 'Good Morning, Student ';
    if (hrs < 17) return 'Good Afternoon, Student ';
    return 'Good Evening, Student ';
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/userlogin');
  };

  return (
    <div className="user-dashboard">
      {/* Left Sidebar */}
      <div className="user-sidebar">
        <div>
          <div className="user-logo-section">
            <div className="user-logo-box">
              <i className="bi bi-mortarboard-fill"></i>
            </div>
            <div>
              <h5>LNM University</h5>
              <span>Student Portal</span>
            </div>
          </div>

          <div className="user-menu-title">MAIN</div>
          <ul className="user-menu">
            <Link to="/user/dashboard" className="user-menu-link">
              <li className="active">
                <i className="bi bi-speedometer"></i>
                Dashboard
              </li>
            </Link>
          </ul>

          <div className="user-menu-title">COMPLAINTS</div>
          <ul className="user-menu">
            <Link to="/user/add-complaint" className="user-menu-link">
              <li>
                <i className="bi bi-plus-circle"></i>
                Add Complaint
              </li>
            </Link>
            <Link to="/user/my-complaints" className="user-menu-link">
              <li>
                <i className="bi bi-card-checklist"></i>
                My Complaints
              </li>
            </Link>
            <Link to="/user/pending" className="user-menu-link">
              <li>
                <i className="bi bi-clock"></i>
                Pending
              </li>
            </Link>
            <Link to="/user/closed" className="user-menu-link">
              <li>
                <i className="bi bi-check-circle"></i>
                Closed
              </li>
            </Link>
          </ul>

          <div className="user-menu-title">COMMUNITY</div>
          <ul className="user-menu">
            <Link to="/user/discussion-forum" className="user-menu-link">
              <li>
                <i className="bi bi-chat-left-dots"></i>
                Discussion Forum
              </li>
            </Link>
          </ul>

          <div className="user-menu-title">ACCOUNT</div>
          <ul className="user-menu">
            <Link to="/user/update-profile" className="user-menu-link">
              <li>
                <i className="bi bi-person-badge"></i>
                Update Profile
              </li>
            </Link>
            <Link to="/user/change-password" className="user-menu-link">
              <li>
                <i className="bi bi-lock"></i>
                Change Password
              </li>
            </Link>
          </ul>
        </div>

        <div className="user-logout" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </div>
      </div>

      {/* Right Main Content */}
      <div className="user-content">
        {/* Topbar */}
        <div className="user-topbar">
          <div className="user-topbar-left">
            <button className="user-menu-btn">
              <i className="bi bi-list"></i>
            </button>
            <span className="user-greeting">{getGreeting()}</span>
          </div>
          <div className="user-topbar-right">
            <span className="user-time">{formattedTime}</span>
            <div className="user-profile">
              <i className="bi bi-person"></i>
            </div>
          </div>
        </div>

        {/* Dashboard Cards Area */}
        <div className="user-container">
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
        </div>
      </div>
    </div>
  )
}

export default UserDashborad
