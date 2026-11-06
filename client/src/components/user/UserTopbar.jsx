import { useEffect, useState } from "react";

const UserTopbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good Morning, Student ";
    if (hour < 17) return "Good Afternoon, Student ";
    return "Good Evening, Student";
  };

  return (
    <nav className="topbar student-topbar">
      <div className="left">
        <button className="menu-btn" type="button">
          <i className="bi bi-list"></i>
        </button>

        <div className="page-title student-greeting">
          <strong>{getGreeting()}</strong>
        </div>
      </div>

      <div className="right">
        <div className="time text-end">
          <h6>{formattedTime.toLowerCase()}</h6>
        </div>

        <div className="profile student-profile-icon">
          <i className="bi bi-person-fill"></i>
        </div>
      </div>
    </nav>
  );
};

export default UserTopbar;
