const express = require('express');
const routes = express.Router();
const Complaint = require('../models/Complaint');

// Get all complaints
routes.get('/show', async (req, res) => {
    try {
        const complaints = await Complaint.find();
        return res.json({ "msg": "Data fetched", "Complaint": complaints });
    } catch (er) {
        console.error(er);
        return res.json({ "msg": "server error" });
    }
});

// Register a new complaint
routes.post('/register', async (req, res) => {
    try {
        const { userName, userEmail, mobile, college, session, enrollmentNumber, complaintType, complaintTypeName, description } = req.body;
        const newComplaint = new Complaint({
            userName,
            userEmail,
            mobile,
            college,
            session,
            enrollmentNumber,
            complaintType,
            complaintTypeName,
            description,
            status: 'not-processed'
        });
        await newComplaint.save();
        return res.json({ "msg": "Complaint registered successfully" });
    } catch (er) {
        console.error(er);
        return res.json({ "msg": "Server error" });
    }
});

// Update complaint status
routes.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await Complaint.findByIdAndUpdate(id, { status });
        return res.json({ "msg": "status updated" });
    } catch (er) {
        console.error(er);
        return res.json({ "msg": "Server error" });
    }
});

module.exports = routes;
