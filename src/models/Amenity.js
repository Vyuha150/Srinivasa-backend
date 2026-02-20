// src/models/Amenity.js
import mongoose from 'mongoose';
import slugify from 'slugify';

const AmenitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  icon: {
    type: String,
    default: 'default-icon.png'
  },
  image: {
    type: String,
    default: 'default-image.jpg'
  },
  features: {
    type: [String],
    default: []
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
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

// Create amenity slug from the name
AmenitySchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Amenity', AmenitySchema);
