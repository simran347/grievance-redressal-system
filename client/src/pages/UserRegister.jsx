import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/cms.png";
import "./UserRegister.css";
const UserRegister = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    father: '',
    email: '',
    mobile: '',
    gender: '',
    dob: '',
    password: '',
    sessionId: '',
    collegeId: '',
    course: '',
    enrollment: '',
    address: '',
  });

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [sessions, setSessions] = useState([]);

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePrevStep = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("UserRegister submit data:", data);
    try {
      const res = await axios.post("http://localhost:5000/api/user/register", data);
      console.log("UserRegister response:", res.data);
      if (res.data && res.data.msg) {
        const message = res.data.msg.toLowerCase();
        if (message.includes("registered")) {
          navigate("/user/dashboard");
          return;
        }
        window.alert(res.data.msg);
      }
    } catch (err) {
      console.error("UserRegister error:", err.response?.data || err.message);
      window.alert(err.response?.data?.msg || "Registration failed. Please try again.");
    }
  };

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/college/active");
        if (res.data && res.data.college) {
          setColleges(res.data.college);
        } else if (res.data && res.data.College) {
          setColleges(res.data.College);
        }
      } catch (err) {
        console.error("Error fetching colleges:", err);
      }
    };

    const fetchSessions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/session/active");
        if (res.data && res.data.session) {
          setSessions(res.data.session);
        } else if (res.data && res.data.Session) {
          setSessions(res.data.Session);
        }
      } catch (err) {
        console.error("Error fetching sessions:", err);
      }
    };

    fetchColleges();
    fetchSessions();
  }, []);

  const nextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const prevStep = (e) => {
    e.preventDefault();
    setStep(1);
  };

  return (
    <div className="container-fluid register-page">
      <div className="row">

        {/* Left Panel */}

        <div className="col-lg-7 left-panel">

          <div className="left-content">

            <div className="left-icon">
              🎓
            </div>

            <h2>Join the University Portal</h2>

            <p>
              Create your account to submit complaints,
              track them and engage with the university.
            </p>

            <div className="steps">

              <div className="step-item active">

                <div className="circle">1</div>

                <div>
                  <h5>Personal Details</h5>
                  <span>Name, Email, Password & Contact</span>
                </div>

              </div>

              <div className="step-item">

                <div className="circle">2</div>

                <div>
                  <h5>Academic Details</h5>
                  <span>College, Course & Enrollment</span>
                </div>

              </div>

              <div className="step-item">

                <div className="circle">3</div>

                <div>
                  <h5>Start Using GRS</h5>
                  <span>Submit & Track Complaints</span>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Right Panel */}

        <div className="col-lg-5 right-panel">

          <div className="register-card">

            <img src={logo} className="top-logo" alt="" />

            <h2>Create Account</h2>

            <p>
              Fill in your personal information to get started.
            </p>

            {/* Progress */}

            <div className="progress-wrapper">

              <div className={`progress-step ${step >= 1 ? "active" : ""}`}>
                1
              </div>

              <div className="progress-line"></div>

              <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
                2
              </div>

            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit}>

              {/* STEP 1 */}

              {step === 1 && (

                <>

                  <div className="row">

                    <div className="col-md-6 mb-3">

                      <label>Full Name</label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Full Name"
                        value={data.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                      />

                    </div>

                    <div className="col-md-6 mb-3">

                      <label>Father's Name</label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Father's Name"
                        value={data.father}
                        onChange={(e) => handleChange('father', e.target.value)}
                        required
                      />

                    </div>

                    <div className="col-md-6 mb-3">

                      <label>Email</label>

                      <input
                        type="email"
                        className="form-control"
                        placeholder="you@email.com"
                        value={data.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                      />

                    </div>

                    <div className="col-md-6 mb-3">

                      <label>Mobile Number</label>

                      <input
                        type="tel"
                        className="form-control"
                        placeholder="10-digit mobile"
                        value={data.mobile}
                        onChange={(e) => handleChange('mobile', e.target.value)}
                        required
                      />

                    </div>

                    <div className="col-md-6 mb-4" style={{ minHeight: '140px' }}>

                      <label>Gender</label>

                      <select
                        className="form-select"
                        style={{ height: '55px' }}
                        value={data.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>

                    </div>

                    <div className="col-md-6 mb-3">

                      <label>Date of Birth</label>

                      <input
                        type="date"
                        className="form-control"
                        value={data.dob}
                        onChange={(e) => handleChange('dob', e.target.value)}
                        required
                      />

                    </div>

                    <div className="col-12 mb-4">

                      <label>Password</label>

                      <div className="input-group">

                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="Create Password"
                          value={data.password}
                          onChange={(e) => handleChange('password', e.target.value)}
                          required
                        />

                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          👁
                        </button>

                      </div>

                    </div>

                  </div>

                  <button
                    type="button"
                    className="btn btn-success next-btn"
                    onClick={nextStep}
                  >
                    Next Step →
                  </button>

                </>

              )}

              {/* STEP 2 */}

              {step === 2 && (

                <>

                  <div className="row">

                    <div className="col-md-6 mb-3" style={{ minHeight: '40px' }}>
                      <label>College</label>
                      <select
                        className="form-select"
                        style={{ height: '55px' }}
                        value={data.collegeId}
                        onChange={(e) => handleChange('collegeId', e.target.value)}
                        required
                      >
                        <option value=''>Select College</option>
                        {colleges.map((item)=>(
                          <option key={item._id} value={item._id}>{item.name}</option>
                        ))}
                      </select>
                      {!colleges.length && (
                        <small className="text-danger">No colleges available. Please ask admin to add colleges before registering.</small>
                      )}

                    </div>

                    <div className="col-md-6 mb-3" style={{ minHeight: '40px' }}>

                      <label>Course</label>

                      <select
                        className="form-select"
                        style={{ height: '55px' }}
                        value={data.course}
                        onChange={(e) => handleChange('course', e.target.value)}
                        required
                      >
                        <option value="">Select Course</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="BCA">BCA</option>
                        <option value="MCA">MCA</option>
                        <option value="MBA">MBA</option>
                      </select>

                    </div>

                    <div className="col-md-6 mb-3" style={{ minHeight: '40px' }} >

                      <label>Session</label>

                      <select
                        className="form-select"
                        style={{ height: '55px' }}
                        value={data.sessionId}
                        onChange={(e) => handleChange('sessionId', e.target.value)}
                        required
                      >
                        <option value="">Select Session</option>
                        {sessions.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      {!sessions.length && (
                        <small className="text-danger">No sessions available. Please ask admin to add sessions before registering.</small>
                      )}

                    </div>

                    <div className="col-md-6 mb-3">

                      <label>Enrollment Number</label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enrollment Number"
                        value={data.enrollment}
                        onChange={(e) => handleChange('enrollment', e.target.value)}
                        required
                      />

                    </div>

                    <div className="col-12 mb-4">

                      <label>Address</label>

                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Enter Address"
                        value={data.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        required
                      ></textarea>

                    </div>

                  </div>

                  <div className="d-flex justify-content-between">

                    <button
                      className="btn btn-secondary"
                      onClick={prevStep}
                    >
                      ← Previous
                    </button>

                    <button type="submit" className="btn btn-success">
                      Create Account
                    </button>

                  </div>

                </>

              )}

            </form>

            <div className="text-center mt-4">

              Already have an account?

              <Link
                to="/userlogin"
                className="ms-2 fw-bold text-success text-decoration-none"
              >
                Sign In
              </Link>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default UserRegister;
