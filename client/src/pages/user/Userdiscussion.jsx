import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Table, Modal } from "react-bootstrap";
import axios from "axios";
import UserSidebar from "../../components/user/UserSidebar";
import UserTopbar from "../../components/user/UserTopbar";
import "../admin/CollegeManagement.css";
import "../user/Userdiscussion.css";

const UserDiscussion = () => {
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answerText, setAnswerText] = useState("");
  const [savingAnswer, setSavingAnswer] = useState(false);

  const userId = localStorage.getItem("userId");

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/discussion/show");
      if (res.data.msg?.toLowerCase().includes("data fetched")) {
        setQuestions(res.data.question || []);
      }
    } catch (err) {
      console.error("Fetch question error:", err);
      window.alert("Unable to load discussion data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAnswers = async (questionId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/discussion/answer/${questionId}`);
      if (res.data.msg?.toLowerCase().includes("data fetched")) {
        setAnswers(res.data.answer || []);
      } else {
        setAnswers([]);
      }
    } catch (err) {
      console.error("Fetch answer error:", err);
      setAnswers([]);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!question.trim()) {
      window.alert("Please enter your question");
      return;
    }

    if (!userId) {
      window.alert("Please login to post a question.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/discussion/question", {
        userId,
        question: question.trim()
      });

      if (res.data.msg?.toLowerCase().includes("question registered")) {
        setQuestion("");
        await fetchQuestions();
        window.alert("Question posted successfully.");
      } else {
        window.alert(res.data.msg || "Unable to post question.");
      }
    } catch (err) {
      console.error("Post question error:", err);
      window.alert("Server error while posting question.");
    }
  };

  const openAnswerModal = async (item) => {
    setSelectedQuestion(item);
    setAnswerText("");
    setShowModal(true);
    await fetchAnswers(item._id);
  };

  const handlePostAnswer = async (event) => {
    event.preventDefault();

    if (!selectedQuestion) return;
    if (!answerText.trim()) {
      window.alert("Please enter your answer.");
      return;
    }
    if (!userId) {
      window.alert("Please login to post an answer.");
      return;
    }

    setSavingAnswer(true);
    try {
      const res = await axios.post("http://localhost:5000/api/discussion/answer", {
        questionId: selectedQuestion._id,
        userId,
        answer: answerText.trim()
      });

      if (res.data.msg?.toLowerCase().includes("answer added")) {
        setAnswerText("");
        await fetchAnswers(selectedQuestion._id);
        window.alert("Answer posted successfully.");
      } else {
        window.alert(res.data.msg || "Unable to post answer.");
      }
    } catch (err) {
      console.error("Post answer error:", err);
      window.alert("Server error while posting answer.");
    } finally {
      setSavingAnswer(false);
    }
  };

  return (
    <div className="student-dashboard">
      <UserSidebar />

      <div className="content">
        <UserTopbar />

        <div className="discussion-page">
          <Container>

            <Row className="justify-content-center mt-5">
              <Col md={8}>
                <Card className="shadow-lg forum-card">
                  <Card.Body>
                    <h1 className="text-center mb-4">Ask Question</h1>

                    <Form onSubmit={handleSubmit}>
                      <Form.Group>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          placeholder="Please enter your question"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                        />
                      </Form.Group>

                      <div className="text-center mt-4">
                        <Button variant="primary" size="lg" type="submit" disabled={loading}>
                          {loading ? "Posting..." : "Add Question"}
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>S No.</th>
                      <th>Question</th>
                      <th>Post Answer</th>
                      <th>View Answer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center">
                          {loading ? "Loading questions..." : "No questions yet."}
                        </td>
                      </tr>
                    ) : (
                      questions.map((item, index) => (
                        <tr key={item._id || item.id}>
                          <td>{index + 1}</td>
                          <td>{item.question}</td>
                          <td>
                            <Button variant="success" onClick={() => openAnswerModal(item)}>
                              Post Answer
                            </Button>
                          </td>
                          <td>
                            <Button variant="info" onClick={() => openAnswerModal(item)}>
                              View
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedQuestion?.question || "Discussion Answers"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <h6>Answers</h6>
            {answers.length === 0 ? (
              <p className="text-muted mb-0">No answers posted yet.</p>
            ) : (
              <ul className="mb-0 ps-3">
                {answers.map((answerItem) => (
                  <li key={answerItem._id} className="mb-2">
                    {answerItem.answer}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Form onSubmit={handlePostAnswer}>
            <Form.Group>
              <Form.Label>Post Your Answer</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your answer here"
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
              />
            </Form.Group>

            <div className="text-end mt-3">
              <Button type="submit" variant="success" disabled={savingAnswer}>
                {savingAnswer ? "Posting..." : "Post Answer"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserDiscussion;