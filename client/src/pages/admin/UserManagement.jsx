import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import App from '../../App'
import axios from "axios";

const UserManagement = () => {

  const [users , setUsers] = useState([])

  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    Object.values(user)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleFetch = async ()=>{
    const res = await axios.get('http://localhost:5000/api/user');
    console.log(res)
    setUsers(res.data.user)
  }
  useEffect(()=>{
    handleFetch();
  },[])
  return (
    <div className="container-fluid bg-light " >
      <div className="card shadow-lg border-0 rounded-4 " style={{width:'1100px'}}>

        <h1 className="fw-bold text-secondary mb-4">
          User Management
        </h1>

        <div className="d-flex justify-content-between align-items-center mb-4 ">

          <div className="d-flex align-items-center mb-2">
            <select className="form-select w-auto me-2">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>

            <span>entries per page</span>
          </div>

          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Search records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "260px" }}
            />
          </div>

        </div>

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="border-bottom">

              <tr className="text-uppercase">

                <th>S No.</th>
                <th>Name</th>
                <th>Father Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>City</th>
                <th>College</th>
                <th>Session</th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.map((user) => (
                <tr key={user.sno}>
                  <td>{user.sno}</td>
                  <td>{user.name}</td>
                  <td>{user.father}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.city}</td>
                  <td>{user.collegeId.name}</td>
                  <td>{user.sessionId.name}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  )
}

export default UserManagement