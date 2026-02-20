// src/models/Project.js
import mongoose from 'mongoose';
import slugify from 'slugify';

const ProjectSchema = new mongoose.Schema({
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
  fullDescription: {
    type: String,
    required: [true, 'Please add full description']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  type: {
    type: String,
    enum: ['Villa', 'Apartment', 'Gated Community', 'Penthouse', 'Renovation'],
    required: [true, 'Please add a type']
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed'],
    default: 'Upcoming'
  },
  year: String,
  area: String, // String to handle values like "4500 Sq. Ft."
  priceRange: String,
  configuration: String,
  tags: [String],
  highlights: [String],
  image: {
    type: String,
    required: [true, 'Please add a main image']
  },
  images: {
    type: [String],
    default: []
  },
  specifications: {
    bedrooms: String,
    bathrooms: String,
    area: String,
    parking: String
  },
  amenities: [String],
  brochureUrl: String,
  order: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create project slug from the name
ProjectSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

export default mongoose.model('Project', ProjectSchema);
