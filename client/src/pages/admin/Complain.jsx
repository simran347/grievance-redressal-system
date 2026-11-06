import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import "./admin.css";

const API_URL = 'http://localhost:5000/api/complaint';

export const Complain = () => {
  const [data, setData] = useState({
    name: '',
    description: '',
  });
  const [complaints, setComplaints] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [entries, setEntries] = useState(10);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${API_URL}/show`);
      if (res.data.msg === 'Data fetched') {
        setComplaints(res.data.Complaint || []);
      }
    } catch (er) {
      console.error(er);
      window.alert('Unable to fetch complaint types');
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setData({ name: '', description: '' });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name.trim() || !data.description.trim()) {
      window.alert('Please enter complaint type and description');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: data.name.trim(),
        description: data.description.trim(),
      };
      const res = editId
        ? await axios.put(`${API_URL}/${editId}`, payload)
        : await axios.post(`${API_URL}/register`, payload);

      window.alert(res.data.msg || (editId ? 'Complaint type updated' : 'Complaint type registered'));
      resetForm();
      fetchComplaints();
    } catch (er) {
      console.error(er);
      window.alert('Sorry, try again');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (complaint) => {
    setEditId(complaint._id);
    setData({
      name: complaint.name || '',
      description: complaint.description || '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this complaint type?')) return;

    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      window.alert(res.data.msg || 'Complaint type deleted');
      fetchComplaints();
    } catch (er) {
      console.error(er);
      window.alert('Unable to delete complaint type');
    }
  };

  const handleStatusToggle = async (complaint) => {
    const nextStatus = complaint.status === 'active' ? 'inactive' : 'active';
    try {
      const res = await axios.patch(`${API_URL}/${complaint._id}`, { status: nextStatus });
      window.alert(res.data.msg || 'Status updated');
      fetchComplaints();
    } catch (er) {
      console.error(er);
      window.alert('Unable to update status');
    }
  };

  const filteredComplaints = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return complaints
      .filter((complaint) => (
        complaint.name?.toLowerCase().includes(term) ||
        complaint.description?.toLowerCase().includes(term) ||
        complaint.status?.toLowerCase().includes(term)
      ))
      .slice(0, entries);
  }, [complaints, searchTerm, entries]);

  return (
    <>
      <div className="container-fluid">
        <div className="row text-center mx-0" style={{justifyContent:'center'}}>
          <div className="col-md-6 text-center mx-0"style={{justifyContent:'center', height:'500px', width:'1000px'}}>
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-primary">
                  <b>{editId ? 'Edit Complaint Type' : 'Add Complaint Type'}</b>
                </h2>
                <br />

                <form method="POST" onSubmit={handleSubmit}>
                  <h6 className="card-text text-start ms-4">
                    <b>Complaint Type</b>
                  </h6>
                  <input
                    className="form-control"
                    placeholder="Enter Complaint Type"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />

                  <h6 className="card-text text-start ms-4 mt-3">
                    <b>Description</b>
                  </h6>
                  <textarea
                    className="form-control"
                    placeholder="Enter Description"
                    name="description"
                    rows="3"
                    value={data.description}
                    onChange={handleChange}
                  />

                  <div className="d-flex justify-content-center gap-2 mt-4">
                    <button type="submit" className="save-college-btn m-2" style={{height:'70px', width:'300px'  }} disabled={loading}>
                      {loading ? 'Saving...' : editId ? 'Update Complaint Type' : 'Save Complaint Type'}
                    </button>
                    {editId && (
                      <button type="button" className="delete-btn" onClick={resetForm}>
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          <section className="registered-colleges my-4">
            <h3>Complaint Types</h3>

            <div className="table-controls">
              <div className="entries-control">
                <select value={entries} onChange={(e) => setEntries(Number(e.target.value))}>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
                <span>entries per page</span>
              </div>

              <input
                type="search"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="table-responsive">
              <table className="college-table">
                <thead>
                  <tr>
                    <th>S NO.</th>
                    <th>COMPLAINT TYPE</th>
                    <th>DESCRIPTION</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredComplaints.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="empty-table-cell">No complaint types found.</td>
                    </tr>
                  ) : (
                    filteredComplaints.map((complaint, index) => (
                      <tr key={complaint._id}>
                        <td>{index + 1}</td>
                        <td>{complaint.name}</td>
                        <td>{complaint.description}</td>
                        <td>
                          <span className={`badge ${complaint.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td>
                          <button type="button" className="edit-btn text-primary" onClick={() => handleEdit(complaint)}>
                            <i className="bi bi-pencil-square"></i>
                            Edit
                          </button>

                          <button type="button" className="edit-btn text-success" style={{height:'40px', width:'100px', borderRadius:'20px'}} onClick={() => handleStatusToggle(complaint)}>
                            <i className={`bi ${complaint.status === 'active' ? 'bi-toggle-on' : 'bi-toggle-off'}`}></i>
                            {complaint.status === 'active' ? 'Inactive' : 'Active'}
                          </button>

                          <button type="button" className="delete-btn text-danger" style={{height:'40px', width:'100px', borderRadius:'20px'}} onClick={() => handleDelete(complaint._id)}>
                            <i className="bi bi-trash-fill"></i>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
