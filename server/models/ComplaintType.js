const mongoose = require('mongoose');

const complaintTypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'active',
    enum:['active','inactive','delete']
  }
},{
  timestamps: true
});

module.exports = mongoose.model('complaintType', complaintTypeSchema);
