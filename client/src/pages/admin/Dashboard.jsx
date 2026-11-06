import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import "./admindashboard.css"

const COLORS = ['#4f46e5', '#22c55e', '#f59e0b', '#ef4444']

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    notProcessed: 0,
    pending: 0,
    closed: 0,
    totalColleges: 0,
    blockedUsers: 0
  });

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/stats');
      if (res.data) {
        setStats(res.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const pieData = [
    { name: 'Users', value: stats.totalUsers || 0 },
    { name: 'Colleges', value: stats.totalColleges || 0 },
    { name: 'Pending', value: stats.pending || 0 },
    { name: 'Blocked', value: stats.blockedUsers || 0 },
  ].filter((item) => item.value > 0);

  return (
    <div>
      <h2 style={{ fontSize: '34px', marginBottom: '10px', fontWeight: 700 }}>Dashboard Overview</h2>
      <p style={{ color: '#777', marginBottom: '35px' }}>Welcome back, Admin. Here is what is happening today.</p>

      <div className="row g-4">
        {/* Total Users */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="dashboard-card">
            <div className="icon primary">
              <i className="bi bi-people-fill"></i>
            </div>
            <div className="card-info">
              <h2 className="primary">{stats.totalUsers}</h2>
              <span>TOTAL USERS</span>
            </div>
          </div>
        </div>

        {/* Not Processed */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="dashboard-card">
            <div className="icon danger">
              <i className="bi bi-exclamation-circle-fill"></i>
            </div>
            <div className="card-info">
              <h2 className="danger">{stats.notProcessed}</h2>
              <span>NOT PROCESSED</span>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="dashboard-card">
            <div className="icon warning">
              <i className="bi bi-clock-fill"></i>
            </div>
            <div className="card-info">
              <h2 className="warning">{stats.pending}</h2>
              <span>PENDING</span>
            </div>
          </div>
        </div>

        {/* Closed */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="dashboard-card">
            <div className="icon success">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <div className="card-info">
              <h2 className="success">{stats.closed}</h2>
              <span>CLOSED</span>
            </div>
          </div>
        </div>

        {/* Total Colleges */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="dashboard-card">
            <div className="icon secondary">
              <i className="bi bi-bank"></i>
            </div>
            <div className="card-info">
              <h2 className="secondary">{stats.totalColleges}</h2>
              <span>TOTAL COLLEGES</span>
            </div>
          </div>
        </div>

        {/* Blocked Users */}
        <div className="col-12 col-md-6 col-xl-3">
          <div className="dashboard-card">
            <div className="icon danger">
              <i className="bi bi-slash-circle-fill"></i>
            </div>
            <div className="card-info">
              <h2 className="danger">{stats.blockedUsers}</h2>
              <span>BLOCKED USERS</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '32px', background: '#fff', borderRadius: '18px', padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
        <h3 style={{ marginBottom: '16px', fontWeight: 700 }}>System Summary</h3>
        {pieData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={95}
                paddingAngle={3}
              >
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p style={{ color: '#666', margin: 0 }}>No chart data available yet.</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard