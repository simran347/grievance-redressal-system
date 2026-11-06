import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/cms.png";
import "./UserLogin.css";

function UserLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      window.alert('Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/user/login', {
        email: email.trim(),
        password: password.trim(),
      });

      if (res.data.msg === 'Login successful') {
        localStorage.setItem('userEmail', res.data.email);
        localStorage.setItem('userName', res.data.name);
        localStorage.setItem('userId', res.data.userId);
        navigate('/user/dashboard');
      } else {
        window.alert(res.data.msg || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMsg = err?.response?.data?.msg || 'Server error during login';
      window.alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid login-page">

      <div className="row ">

        {/* LEFT PANEL */}

        <div className="col-lg-7 left-login">

          <div className="left-content">

            <div className="university-icon ">
              <i className="bi bi-bank"></i>
            </div>

            <h1>Lalit Narayan Mithila University</h1>

            <p>
              Grievance Redressal System — Submit, track
              and resolve your complaints easily.
            </p>

            <div className="feature">

              <div className="feature-icon">
                <i className="bi bi-file-earmark-text-fill"></i>
              </div>

              <span>Submit complaints online instantly</span>

            </div>

            <div className="feature">

              <div className="feature-icon">
                <i className="bi bi-clock-fill"></i>
              </div>

              <span>Track status in real time</span>

            </div>

            <div className="feature">

              <div className="feature-icon">
                <i className="bi bi-shield-lock-fill"></i>
              </div>

              <span>Secure & confidential process</span>

            </div>

            <div className="feature">

              <div className="feature-icon">
                <i className="bi bi-chat-dots-fill"></i>
              </div>

              <span>Discuss issues in the forum</span>

            </div>

          </div>

        </div>

        {/* ================= RIGHT PANEL ================= */}

        <div className="col-lg-5 right-login">

          <div className="login-card">

            <img
              src={logo}
              alt="University Logo"
              className="login-logo"
            />

            <h2>
              Welcome back 👋
            </h2>

            <p>
              Sign in to your student account to continue.
            </p>

            <form onSubmit={handleSubmit}>

              {/* Email */}

              <div className="mb-2">

                <label className="form-label">
                  Email Address
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

              {/* Password */}

              <div className="mb-2">

                <label className="form-label">
                  Password
                </label>

                <div className="input-group">

                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter your password"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    <i
                      className={
                        showPassword
                          ? "bi bi-eye-slash-fill"
                          : "bi bi-eye-fill"
                      }
                    ></i>
                  </button>

                </div>

              </div>

              <div className="text-end mb-2">

                <Link
                  to="/forgot-password"
                  className="forgot-link"
                >
                  Forgot password?
                </Link>

              </div>

              {/* Login Button */}

              <button
                type="submit"
                className="btn login-btn"
                disabled={loading}
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

            </form>

            {/* Bottom Links */}

            <div className="bottom-links">

              <p>

                Don't have an account?

                <Link
                  to="/userregister"
                  className="register-link"
                >
                  Create Account
                </Link>

              </p>

              <Link
                to="/"
                className="home-link"
              >
                ← Back to Home
              </Link>

            </div>

            <hr />

            <div className="copyright">

              © 2026 LNM University Grievance Redressal System

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default UserLogin;
