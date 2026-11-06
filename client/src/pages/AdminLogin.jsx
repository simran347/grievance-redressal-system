import React,{useState} from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { FaShieldAlt, FaLock, FaEye, FaSignInAlt } from "react-icons/fa";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [data , setData] = useState({
    email:'',
    password:''
  })
  const handleChange = (e)=>{
    // console.log(e.target.value);
    setData(()=>({...data,[e.target.name]:e.target.value}))
  }
  console.log(data)

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/admin/login',data)
    if(res.data.msg=="success"){
      window.alert("login Successfully")
      localStorage.setItem("adminId",res.data.adminId)
      localStorage.setItem("token",res.data.token)
      localStorage.setItem("name",res.data.name)
      localStorage.setItem("role",'admin')
      navigate('/admin/dashboard')
    }else{
      window.alert(res.data.msg)
    }
    
  }




  return (
    <div className="admin-bg d-flex justify-content-center align-items-center">

      <div className="card admin-card border-0" style={{ width: "420px", maxWidth: "90vw" }}>

        {/* Header */}

        <div className="admin-header text-center text-white">

          <div className="icon-box mx-auto">
            <FaShieldAlt size={35} />
          </div>

          <h2 className="fw-bold mt-4">Admin Portal</h2>

          <p>LNM University Grievance Redressal System</p>

        </div>

        {/* Body */}

        <div className="card-body p-4">

          <div className="text-center mb-4">

            <span className="badge rounded-pill text-primary border border-primary px-3 py-2">
              <FaLock className="me-2" />
              RESTRICTED ACCESS
            </span>

          </div>
          <form action="" method="POST" onSubmit={handleSubmit}  >
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Admin Email
            </label>

            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="admin@university.edu"
              name="email"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">

            <label className="form-label fw-semibold">
              Password
            </label>

            <div className="input-group">

              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Enter admin password"
                name="password"
                onChange={handleChange}
              />

              <span className="input-group-text bg-white">
                <FaEye />
              </span>

            </div>

          </div>

          <button type="submit" className="btn btn-login w-100 py-3">

            <FaSignInAlt className="me-2" />
            Sign In as Admin

          </button>
            </form>
          <div className="text-center mt-4">

            <Link to="/" className="text-decoration-none fw-semibold">
              ← Back to Home
            </Link>

          </div>

          <hr />

          <p className="text-center text-muted small">
            © 2024 LNM University • Admin access is logged and monitored
          </p>

        </div>

      </div>

    </div>
  );
};

export default AdminLogin;