import React, { useEffect, useState } from "react";
import axios from "axios";
import UserSidebar from "../../components/user/UserSidebar";
import UserTopbar from "../../components/user/UserTopbar";
import "../admin/CollegeManagement.css";


const AddComplaint = () => {
  const [form, setForm] = useState(() => ({
    userName:
      localStorage.getItem("grsUserName") ||
      localStorage.getItem("userName") ||
      "",
    userEmail:
      localStorage.getItem("grsUserEmail") ||
      localStorage.getItem("userEmail") ||
      localStorage.getItem("email") ||
      "",
    complaintType: "",
    description: "",
  }));
  const [complaintTypes, setComplaintTypes] = useState([]);
  const [attachedFile, setAttachedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/complaint/active");
        if (res.data.msg === "Complaint fetched") {
          setComplaintTypes(res.data.Complaint || []);
        }
      } catch (err) {
        console.error("Error fetching complaint types:", err);
      }
    };

    fetchTypes();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.complaintType || !form.description) {
      window.alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const selectedComplaintType = complaintTypes.find((type) => type._id === form.complaintType);
      const payload = {
        userName: form.userName,
        userEmail: form.userEmail,
        complaintType: form.complaintType,
        complaintTypeName: selectedComplaintType?.name || "",
        description: form.description,
      };

      let res;
      if (attachedFile) {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append("document", attachedFile);
        res = await axios.post("http://localhost:5000/api/complaints/register", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await axios.post("http://localhost:5000/api/complaints/register", payload);
      }

      if (res.data.msg && res.data.msg.toLowerCase().includes("complaint registered")) {
        window.alert("Complaint submitted successfully!");
        if (form.userEmail) localStorage.setItem("grsUserEmail", form.userEmail);
        if (form.userName) localStorage.setItem("grsUserName", form.userName);
        setForm((prevForm) => ({
          ...prevForm,
          complaintType: "",
          description: "",
        }));
        setAttachedFile(null);
      } else {
        window.alert(res.data.msg || "Unable to submit complaint.");
      }
    } catch (err) {
      console.error(err);
      window.alert("Server error while submitting complaint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-dashboard">
      <UserSidebar />

      <div className="content">
        <UserTopbar />

        <div className="college-page">
          <section className="college-form-card ">
            <h3 className="heading text-center">Add Complain</h3>



            <form onSubmit={handleSubmit}>
              <div className="college-field">
                <label htmlFor="complaintType">Complaint Type</label>
                <select
                  id="complaintType"
                  name="complaintType"
                  value={form.complaintType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select complaint type</option>
                  {complaintTypes.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="college-field">
                <label htmlFor="description">Complaint Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  placeholder="Describe your complaint"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="d-flex justify-content-center gap-3">
                <button type="submit" className="save-college-btn m-0" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Complaint"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddComplaint;
