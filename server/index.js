const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const mongoDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
mongoDB();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/college", require("./routes/collegeRoute"))
app.use("/api/session", require("./routes/sessionRoute"))
app.use("/api/complaint", require("./routes/complaintRoute"))
app.use("/api/complaints", require("./routes/complaintsRoute"))
app.use("/api/user", require("./routes/userRoute"))
app.use("/api/discussion", require("./routes/discussionForumRoute"))

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});