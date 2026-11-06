const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: false,
  },
  college: {
    type: String,
    required: false,
  },
  session: {
    type: String,
    required: false,
  },
  enrollmentNumber: {
    type: String,
    required: false,
  },
  complaintType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "complaintType",
    required: true,
  },
  complaintTypeName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["not-processed", "pending", "closed"],
    default: "not-processed",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Complaint", complaintSchema);