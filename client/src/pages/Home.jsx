import React from "react";
import { Link } from "react-router-dom";
import cms from "../assets/cms.png";
import admin from "../assets/admin.png";
import ragistration from "../assets/ragistration.png";
import userlogin2 from "../assets/userlogin2.png";
import "../App.css";
const Home = () => {
  return (
    <>
      <div className="container text-center mt-3">

        {/* Logo */}
        <img src={cms} alt="Logo" className="logo" />

        {/* Heading */}
        <h2 className="text-primary mt-3">
          Lalit Narayan Mithila University Darbhanga Bihar
        </h2>

        <h3>Grievance Redressal Portal</h3>

        {/* Cards */}
        <div className="row mt-5 g-4 justify-content-center cards-row">

          {/* Admin */}
          <div className="col-md-4 mb-4 d-flex">
            <Link to="/adminlogin" className="text-decoration-none w-100">
              <div className="card shadow card-box w-100 h-150" style={{boxShadow:'100px'}}>
                <div className="row g-0 align-items-center">

                  <div className="col-4">
                    <img src={admin} className="img-fluid p-3" alt="Admin" style={{ width: "100%", height: "252px", objectFit: "contain", }} />
                  </div>

                  <div className="col-8">
                    <div className="card-body">
                      <h4 className="text-primary">Admin Login</h4>
                      <p>For Admin Login</p>
                    </div>
                  </div>

                </div>
              </div>
            </Link>
          </div>
          {/* Registration */}

          <div className="col-md-4 mb-4 d-flex">
            <Link to="/userregister" className="text-decoration-none w-100">
              <div className="card shadow card-box w-100" style={{boxShadow:'100px'}}> 
                <div className="row g-0 align-items-center">

                  <div className="col-4">
                    <img src={ragistration} alt="Registration" style={{width: "100%", height: "252px", objectFit: "contain" }} />
                  </div>

                  <div className="col-8">
                    <div className="card-body">
                      <h4 className="text-primary">
                        User Registration
                      </h4>
                      <p>For User Registration</p>
                    </div>
                  </div>

                </div>
              </div>
            </Link>
          </div>

          {/* User Login */}

          <div className="col-md-4 mb-4 d-flex">
            <Link to="/userlogin" className="text-decoration-none w-100">
              <div className="card shadow card-box w-100"style={{boxShadow:'100px'}}>
                <div className="row g-0 align-items-center">

                  <div className="col-4">
                    <img src={userlogin2} className="img-fluid p-3" alt="User Login" style={{ width: "100%", height: "252px", objectFit: "contain" }} />
                  </div>

                  <div className="col-8">
                    <div className="card-body">
                      <h4 className="text-primary">User Login</h4>
                      <p>For User Login</p>
                    </div>
                  </div>

                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
      <br />
      <br />

      {/* Footer */}

      <footer className="bg-primary text-white text-center p-2 mt-5">
        All right reserved © 2026-27 Designed and Developed by Simran
        Tiwari
      </footer>
    </>
  );
};

export default Home;
