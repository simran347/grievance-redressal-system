import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import UserSidebar from "../../components/user/UserSidebar";
import UserTopbar from "../../components/user/UserTopbar";
import "./ChangePassword.css";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please sign in again to change your password.");
      navigate("/userlogin");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.put("http://localhost:5000/api/user/change-password", {
        userId,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      if (res.data?.msg) {
        alert(res.data.msg);
        setData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        navigate("/user/dashboard");
      } else {
        alert("Password update failed. Please try again.");
      }
    } catch (error) {
      const message = error?.response?.data?.msg || "Server error while changing password.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-dashboard">
      <UserSidebar />
      <div className="content">
        <UserTopbar />
        <div
          className="change-password-page"
          style={{
            padding: '30px',
            minHeight: 'calc(100vh - 130px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Container>
            <Row className="justify-content-center">
              <Col md={4} lg={9}>
                <Card className="password-card shadow-lg">

                  <Card.Body>

                    <h1 className="text-center mb-5">
                      Change Password
                    </h1>

                    <Form onSubmit={handleSubmit}>

                      <Form.Group className="mb-4">
                        <Form.Control
                          type="password"
                          placeholder="Enter Your Old Password"
                          name="oldPassword"
                          value={data.oldPassword}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Control
                          type="password"
                          placeholder="Enter Your New Password"
                          name="newPassword"
                          value={data.newPassword}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Control
                          type="password"
                          placeholder="Enter Your New Confirm Password"
                          name="confirmPassword"
                          value={data.confirmPassword}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <div className="text-center">

                        <Button
                        style={{borderRadius:'20px'}}
                          type="submit"
                          className="change-btn"
                          disabled={loading}
                        >
                          {loading ? "Updating..." : "Change Password"}
                        </Button>

                      </div>

                    </Form>

                  </Card.Body>

                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;