import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import "./admin.css";

const API_URL = 'http://localhost:5000/api/session';

const Session = () => {
  const [data, setData] = useState({ name: '' });
  const [sessions, setSessions] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [entries, setEntries] = useState(10);

  const fetchSessions = async () => {
    try {
      const res = await axios.get(`${API_URL}/show`);
      if (res.data.msg === 'Data fetched') {
        setSessions(res.data.Session || []);
      }
    } catch (er) {
      console.error(er);
      window.alert('Unable to fetch sessions');
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setData({ name: '' });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name.trim()) {
      window.alert('Please enter a session value');
      return;
    }

    setLoading(true);
    try {
      const payload = { name: data.name.trim() };
      const res = editId
        ? await axios.put(`${API_URL}/${editId}`, payload)
        : await axios.post(`${API_URL}/register`, payload);

      window.alert(res.data.msg || (editId ? 'Session updated' : 'Session registered'));
      resetForm();
      fetchSessions();
    } catch (er) {
      console.error(er);
      window.alert('Sorry, try again');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (session) => {
    setEditId(session._id);
    setData({ name: session.name || '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this session?')) return;

    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      window.alert(res.data.msg || 'Session deleted');
      fetchSessions();
    } catch (er) {
      console.error(er);
      window.alert('Unable to delete session');
    }
  };

  const handleStatusToggle = async (session) => {
    const nextStatus = session.status === 'active' ? 'inactive' : 'active';
    try {
      const res = await axios.patch(`${API_URL}/${session._id}`, { status: nextStatus });
      window.alert(res.data.msg || 'Status updated');
      fetchSessions();
    } catch (er) {
      console.error(er);
      window.alert('Unable to update status');
    }
  };

  const filteredSessions = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return sessions
      .filter((session) => session.name?.toLowerCase().includes(term) || session.status?.toLowerCase().includes(term))
      .slice(0, entries);
  }, [sessions, searchTerm, entries]);

  return (
    <>
      <div className="container-fluid">
        <div className="row text-center mx-0 " style={{justifyContent:'center'}} >
          <div className="col-md-6 text-center mx-0" style={{justifyContent:'center', height:'500px', width:'1000px'}}>
            <div className="card">
              <div className="card-body" style={{justifyContent:'center', height:'400px', width:'800px'}}>
                <h2 className="card-title text-primary">
                  <b>{editId ? 'Edit Session' : 'Add New Session'}</b>
                </h2>
                <br /><br />

                <form method="POST" onSubmit={handleSubmit}>
                  <h6 className="card-text text-start ms-4">Session Value</h6>
                  <input
                    className="form-control"
                    placeholder="Enter Session E.g-(2026-27)"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />
                    <br />
                  <div className="d-flex justify-content-center gap-2 mt-4">
                    <button type="submit" className="save-college-btn m-0" disabled={loading}>
                      {loading ? 'Saving...' : editId ? 'Update Session' : 'Save Session'}
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
            <h3>Registered Sessions</h3>

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
                    <th>SESSION</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredSessions.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="empty-table-cell">No sessions found.</td>
                    </tr>
                  ) : (
                    filteredSessions.map((session, index) => (
                      <tr key={session._id}>
                        <td>{index + 1}</td>
                        <td>{session.name}</td>
                        <td>
                          <span className={`badge ${session.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                            {session.status}
                          </span>
                        </td>
                        <td>
                          <button type="button" className="edit-btn" onClick={() => handleEdit(session)}>
                            <i className="bi bi-pencil-square"></i>
                            Edit
                          </button>

                          <button type="button" className="edit-btn" style={{height:'40px', width:'100px', borderRadius:'20px'}} onClick={() => handleStatusToggle(session)}>
                            <i className={`bi ${session.status === 'active' ? 'bi-toggle-on' : 'bi-toggle-off'}`}></i>
                            {session.status === 'active' ? 'Inactive' : 'Active'}
                          </button>

                          <button type="button" className="delete-btn" style={{height:'40px', width:'100px', borderRadius:'20px'}} onClick={() => handleDelete(session._id)}>
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

export default Session
