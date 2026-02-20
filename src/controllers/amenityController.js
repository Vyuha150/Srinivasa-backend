// src/controllers/amenityController.js
import Amenity from '../models/Amenity.js';

// @desc    Get all amenities
// @route   GET /api/amenities
// @access  Public
export const getAmenities = async (req, res, next) => {
  try {
    let query;
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);
    
    // Handle special filters mapping
    if (req.query.active) {
       reqQuery.isActive = req.query.active === 'true';
       delete reqQuery.active;
    }

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    query = Amenity.find(JSON.parse(queryStr));

    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }
    
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Amenity.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    const amenities = await query;

    const pagination = {};
    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    res.status(200).json({
      success: true,
      count: amenities.length,
      pagination,
      data: amenities
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single amenity
// @route   GET /api/amenities/:id
// @access  Public
export const getAmenity = async (req, res, next) => {
  try {
    const amenity = await Amenity.findById(req.params.id);
    if (!amenity) {
      return res.status(404).json({ success: false, error: 'Amenity not found' });
    }
    res.status(200).json({ success: true, data: amenity });
  } catch (err) {
    next(err);
  }
};

// @desc    Create amenity
// @route   POST /api/amenities
// @access  Private
export const createAmenity = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path.replace(/\\/g, '/');
    }
    
    if (typeof req.body.features === 'string') {
        try {
            req.body.features = JSON.parse(req.body.features);
        } catch (e) {}
    }

    const amenity = await Amenity.create(req.body);
    res.status(201).json({ success: true, data: amenity });
  } catch (err) {
    next(err);
  }
};

// @desc    Update amenity
// @route   PUT /api/amenities/:id
// @access  Private
export const updateAmenity = async (req, res, next) => {
  try {
    let amenity = await Amenity.findById(req.params.id);
    if (!amenity) {
      return res.status(404).json({ success: false, error: 'Amenity not found' });
    }

    if (req.file) {
      req.body.image = req.file.path.replace(/\\/g, '/');
    }

    if (typeof req.body.features === 'string') {
        try {
            req.body.features = JSON.parse(req.body.features);
        } catch (e) {}
    }

    amenity = await Amenity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: amenity });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete amenity
// @route   DELETE /api/amenities/:id
// @access  Private
export const deleteAmenity = async (req, res, next) => {
  try {
    const amenity = await Amenity.findByIdAndDelete(req.params.id);
    if (!amenity) {
      return res.status(404).json({ success: false, error: 'Amenity not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle amenity active status
// @route   PUT /api/amenities/:id/toggle
// @access  Private
export const toggleAmenityStatus = async (req, res, next) => {
    try {
        const amenity = await Amenity.findById(req.params.id);

        if (!amenity) {
            return res.status(404).json({ success: false, error: 'Amenity not found' });
        }

        amenity.isActive = !amenity.isActive;
        await amenity.save();

        res.status(200).json({ success: true, data: amenity });
    } catch (err) {
        next(err);
    }
};
