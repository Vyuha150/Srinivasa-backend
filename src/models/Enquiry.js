// src/models/Enquiry.js
import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  message: {
    type: String,
    required: [true, 'Please add a message']
  },
  projectType: String,
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: false
  },
  projectName: String,
  budget: String,
  location: String,
  status: {
    type: String,
    enum: ['new', 'contacted', 'closed'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp
EnquirySchema.pre('save', function(next) {
  if (this.isModified()) {
      this.updatedAt = Date.now();
  }
  next();
});

export default mongoose.model('Enquiry', EnquirySchema);
