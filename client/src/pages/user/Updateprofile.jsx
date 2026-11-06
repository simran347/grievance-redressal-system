import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button
} from "react-bootstrap";

import { FaUserCircle, FaCamera, FaSave, FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import UserSidebar from "../../components/user/UserSidebar";
import UserTopbar from "../../components/user/UserTopbar";
import "../admin/CollegeManagement.css";
import "./Profile.css";

const Updateprofile = () => {
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    father: "",
    gender: "",
    dob: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
    course: "",
    college: "",
    session: "",
    profile: ""
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        window.alert("Please login first.");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/user/profile/${userId}`);
        const user = res.data.user;

        setFormData({
          name: user?.name || "",
          father: user?.father || "",
          gender: user?.gender || "",
          dob: user?.dob || "",
          email: user?.email || "",
          mobile: user?.mobile || "",
          address: user?.address || "",
          city: user?.city || "",
          pincode: user?.pincode || "",
          course: user?.course || "",
          college: user?.collegeId || "",
          session: user?.sessionId || "",
          profile: user?.profile || ""
        });

        if (user?.profile) {
          setPreview(user.profile);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        window.alert("Unable to load profile data.");
      }
    };

    fetchProfile();
  }, [userId]);

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setPreview(base64);
      setFormData((prev) => ({ ...prev, profile: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId) {
      window.alert("Please login first.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        father: formData.father.trim(),
        gender: formData.gender,
        dob: formData.dob,
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        address: formData.address.trim(),
        course: formData.course.trim(),
        profile: formData.profile,
        city: formData.city.trim(),
        pincode: formData.pincode.trim(),
      };

      const res = await axios.put(`http://localhost:5000/api/user/profile/${userId}`, payload);

      if (res.data.msg === "Profile updated successfully") {
        window.alert("Profile updated successfully");
      } else {
        window.alert(res.data.msg || "Unable to update profile");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      window.alert(err?.response?.data?.msg || "Server error while saving profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-dashboard">
      <UserSidebar />
      <div className="content">
        <UserTopbar />
        <Container className="py-5 mt-5">

      <Card className="profile-card shadow-lg" style={{ maxWidth: '980px', margin: '0 auto' }}>

        {/* Header */}

        <div className="profile-header">

          <h2>
            <FaUserCircle className="me-2" />
            My Profile
          </h2>

          <p>Manage your personal information</p>

        </div>

        {/* Avatar */}

        <div className="profile-avatar">

          <div className="avatar-circle">

            {preview ? (
              <img src={preview} alt="Profile preview" className="profile-preview-img" />
            ) : (
              <FaUserCircle size={70} color="white" />
            )}

            <label className="camera-icon" htmlFor="profile-photo-upload">
              <FaCamera />
            </label>

          </div>

        </div>

        <Form onSubmit={handleSubmit}>
          <Card.Body>

            {/* Upload */}

            <h6 className="section-title">
              PROFILE PHOTO
            </h6>

            <label className="upload-box" htmlFor="profile-photo-upload">
              <input
                id="profile-photo-upload"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handlePhotoChange}
                className="d-none"
              />

              <FaCloudUploadAlt size={35} />

              <p>
                Click to upload a new photo (JPG, PNG — max 5 MB)
              </p>

            </label>

            {/* Personal */}

            <h6 className="section-title mt-5">
              PERSONAL INFORMATION
            </h6>

            <Row>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control name="name" className="bg-warning" onChange={handleChange} value={'Simran Tiwari'} disabled/>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Father Name</Form.Label>
                  <Form.Control name="father" className="bg-warning" onChange={handleChange} value={'Mr. Dinesh Tiwari'} disabled />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>

                  <Form.Select name="gender" className="bg-warning" onChange={handleChange} >
                    
                    <option value="Female">Female</option>
                  
                  </Form.Select>

                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control  onChange={handleChange} className="bg-warning" value={'05-09-2008'} disabled/>
                </Form.Group>
              </Col>

            </Row>

            {/* Contact */}

            <h6 className="section-title mt-4">
              CONTACT
            </h6>

            <Row>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control name="email" className="bg-warning" onChange={handleChange} value={'simrantiwari28720@gmail.com'} disabled />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control name="mobile" className="bg-warning"  onChange={handleChange} value={'8467020138'} disabled />
                </Form.Group>
              </Col>

              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control name="address" className="bg-warning"  onChange={handleChange} value={'Gayatri Nagar Colony'} disabled />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control name="city" className="bg-warning" onChange={handleChange} value={'Varanasi'} disabled />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control name="pincode" className="bg-warning"  onChange={handleChange} value={'221005'} disabled />
                </Form.Group>
              </Col>

            </Row>

            {/* Academic */}

            <h6 className="section-title mt-4">
              ACADEMIC DETAILS
            </h6>

            <Row>

              <Col md={4}>
                <Form.Group className="mb-3 ">
                  <Form.Label>Course</Form.Label>
                  <Form.Control name="course" className="bg-warning" onChange={handleChange} value={'Diploma'} disabled/>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>College</Form.Label>
                  <Form.Control name="college" className="bg-warning" onChange={handleChange} value={'GLI, Agra'} disabled />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Session</Form.Label>
                  <Form.Control name="session" className="bg-warning"  onChange={handleChange} value={'2024-27'} disabled  />
                </Form.Group>
              </Col>

            </Row>

            <div className="text-end mt-4">

              <Button type="submit" className="save-btn" >

                <FaSave className="me-2" />

                {loading ? "Saving..." : "Save Changes"}

              </Button>

            </div>

          </Card.Body>
        </Form>

      </Card>

    </Container>
      </div>
    </div>
  );
};

export default Updateprofile;