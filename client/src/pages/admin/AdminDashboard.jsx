import React, { useState, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import "./admindashboard.css";

const role = localStorage.getItem('role')

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());
  const [complaintsOpen, setComplaintsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const isActive = (path) => {
    return location.pathname === path;
  };

 
  
 
   
  
  const handlelogout = ()=>{
    localStorage.removeItem('adminId')
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('role')
    navigate('/adminlogin')
  }

  
  // if(role=='admin'){
      
  //   }else{
  //    handlelogout()
  //   }
  return (
    <div className="admin-dashboard">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div>
          <div className="logo-section">
            <div className="logo-box">
              <i className="bi bi-bank"></i>
            </div>
            <div>
              <h5 style={{ margin: 0, fontWeight: 700 }}>LNM University</h5>
              <span>Admin Panel</span>
            </div>
          </div>

          <div className="menu-title">MAIN</div>
          <ul className="menu">
            <Link to="/admin/dashboard" className="menu-link">
              <li className={isActive('/admin/dashboard') ? 'active' : ''}>
                <i className="bi bi-speedometer"></i>
                Dashboard
              </li>
            </Link>
          </ul>

          <div className="menu-title">MANAGEMENT</div>
          <ul className="menu">
            <Link to="/admin/college management" className="menu-link">
              <li className={isActive('/admin/college management') ? 'active' : ''}>
                <i className="bi bi-bank"></i>
                College Management
              </li>
            </Link>
            <Link to="/admin/session" className="menu-link">
              <li className={isActive('/admin/session') ? 'active' : ''}>
                <i className="bi bi-calendar-event"></i>
                Session Management
              </li>
            </Link>
            <Link to="/admin/complaint" className="menu-link">
              <li className={isActive('/admin/complaint') ? 'active' : ''}>
                <i className="bi bi-tags"></i>
                Complaint Types
              </li>
            </Link>

            <div className="menu-dropdown">
              <li onClick={() => setComplaintsOpen(!complaintsOpen)}>
                <i className="bi bi-file-earmark-text"></i>
                Complaints
                <i className={`bi sidebar-arrow ms-auto ${complaintsOpen ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
              </li>
              {complaintsOpen && (
                <ul className="submenu">
                  <li>All Complaints</li>
                  <li>New Complaint</li>
                  <li>Resolved</li>
                </ul>
              )}
            </div>
          </ul>

          <div className="menu-title">USERS</div>
          <ul className="menu">
            <Link to="/admin/usermanagement" className="menu-link">
              <li className={isActive('/admin/usermanagement') ? 'active' : ''}>
                <i className="bi bi-people-fill"></i>
                User Management
              </li>
            </Link>
            <Link to="/admin/blockedusers" className="menu-link">
              <li className={isActive('/admin/blockedusers') ? 'active' : ''}>
                <i className="bi bi-slash-circle"></i>
                Blocked Users
              </li>
            </Link>
          </ul>

          <div className="menu-title">COMMUNITY</div>
          <ul className="menu">
            <Link to="/admin/discussion" className="menu-link">
              <li className={isActive('/admin/discussion') ? 'active' : ''}>
                <i className="bi bi-chat-left-dots"></i>
                Discussion Forum
              </li>
            </Link>
          </ul>

          <div className="menu-title">ACCOUNT</div>
          <ul className="menu">
            <Link to="/admin/account" className="menu-link">
              <li className={isActive('/admin/account') ? 'active' : ''}>
                <i className="bi bi-lock"></i>
                Change Password
              </li>
            </Link>
          </ul>
          <ul className="menu">
           
          <div className="logout">
            <i className="bi bi-box-arrow-right"></i><button onClick={handlelogout} className='btn text-danger ' style={{height:'40px', width:'100px', borderRadius:'20px', fontSize:'20px'}}><b>Logout</b> </button>
            
            
          </div>
        
          </ul>
        </div>

        
      </div>

      {/* Right Main Content */}
      <div className="content">
        {/* Topbar */}
        <div className="topbar">
          <div className="left">
            <button className="menu-btn">
              <i className="bi bi-list"></i>
            </button>
            <div className="page-title">
              <strong>Admin Panel</strong>
              <span>/ Dashboard</span>
            </div>
          </div>
          <div className="right">
            <div className="time">
              {/* <h6>{formattedTime}</h6>
              <small>{formattedDate}</small> */}
            </div>
            <div className="profile">
              <i className="bi bi-person"></i>
            </div>
          </div>
        </div>

        {/* Dashboard Pages */}
        <div className="dashboard-container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
