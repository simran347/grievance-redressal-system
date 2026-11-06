import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const complaintLinks = [
  {
    path: "/user/add-complaint",
    label: "Add Complaint",
    icon: "bi-plus-circle",
  },
  {
    path: "/user/my-complaints",
    label: "My Complaints",
    icon: "bi-card-list",
  },
  {
    path: "/user/pending",
    label: "Pending",
    icon: "bi-clock",
  },
  {
    path: "/user/closed",
    label: "Closed",
    icon: "bi-check-circle",
  },
];

const UserSidebar = () => {
  const location = useLocation();
  const isComplaintsSection =
    location.pathname.startsWith("/user/add-complaint") ||
    location.pathname.startsWith("/user/my-complaints") ||
    location.pathname.startsWith("/user/pending") ||
    location.pathname.startsWith("/user/closed");

  const [complaintsOpen, setComplaintsOpen] = useState(isComplaintsSection);

  useEffect(() => {
    if (isComplaintsSection) {
      setComplaintsOpen(true);
    }
  }, [isComplaintsSection]);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar student-sidebar">
      <div>
        <div className="logo-section">
          <div className="logo-box logo-student">
            <i className="bi bi-mortarboard-fill"></i>
          </div>

          <div>
            <h5>LNM University</h5>
            <span>Student Portal</span>
          </div>
        </div>

        <div className="menu-title">MAIN</div>

        <ul className="menu">
          <Link to="/user/dashboard" className="menu-link">
            <li className={isActive("/user/dashboard") ? "active" : ""}>
              <i className="bi bi-speedometer2"></i>
              Dashboard
            </li>
          </Link>

          <div className="menu-title">COMPLAINTS</div>

          <li
            className={`menu-dropdown ${isComplaintsSection ? "active" : ""}`}
            onClick={() => setComplaintsOpen((open) => !open)}
          >
            <i className="bi bi-file-earmark-text"></i>
            Complaints
            <i
              className={`bi bi-chevron-${complaintsOpen ? "down" : "right"} ms-auto`}
            ></i>
          </li>

          {complaintsOpen && (
            <ul className="submenu">
              {complaintLinks.map((item) => (
                <Link key={item.path} to={item.path} className="menu-link">
                  <li className={isActive(item.path) ? "active" : ""}>
                    <i className={`bi ${item.icon}`}></i>
                    {item.label}
                  </li>
                </Link>
              ))}
            </ul>
          )}

          <div className="menu-title">COMMUNITY</div>

          <Link to="/user/discussion-forum" className="menu-link">
            <li className={isActive("/user/discussion-forum") ? "active" : ""}>
              <i className="bi bi-chat-left-dots"></i>
              Discussion Forum
            </li>
          </Link>

          <div className="menu-title">ACCOUNT</div>

          <Link to="/user/update-profile" className="menu-link">
            <li className={isActive("/user/update-profile") ? "active" : ""}>
              <i className="bi bi-person"></i>
              Update Profile
            </li>
          </Link>

          <Link to="/user/change-password" className="menu-link">
            <li className={isActive("/user/change-password") ? "active" : ""}>
              <i className="bi bi-lock"></i>
              Change Password
            </li>
          </Link>
        </ul>
      </div>

      <div className="logout">
        <i className="bi bi-box-arrow-right"></i>
        Logout
      </div>
    </div>
  );
};

export default UserSidebar;
