// src/controllers/enquiryController.js
import Enquiry from '../models/Enquiry.js';

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private (Admin)
export const getEnquiries = async (req, res, next) => {
  try {
    let query;
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
    removeFields.forEach(param => delete reqQuery[param]);
    
    let queryStr = JSON.stringify(reqQuery);
    
    if (req.query.search) {
        const searchRegex = new RegExp(req.query.search, 'i');
        query = Enquiry.find({
            $or: [
                { name: searchRegex },
                { email: searchRegex },
               // { phone: searchRegex } // might be tricky with formatting
            ],
            ...JSON.parse(queryStr)
        });
    } else {
        query = Enquiry.find(JSON.parse(queryStr));
    }
    
    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Enquiry.countDocuments(query.getFilter());

    query = query.skip(startIndex).limit(limit);

    const enquiries = await query;

    const pagination = {};
    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    res.status(200).json({
      success: true,
      count: enquiries.length,
      pagination: {
          ...pagination,
          total,
          pages: Math.ceil(total / limit)
      },
      data: enquiries
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single enquiry
// @route   GET /api/enquiries/:id
// @access  Private (Admin)
export const getEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, error: 'Enquiry not found' });
    }
    res.status(200).json({ success: true, data: enquiry });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new enquiry
// @route   POST /api/enquiries
// @access  Public
export const createEnquiry = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.projectId) {
        data.project = data.projectId;
        delete data.projectId;
    }
    const enquiry = await Enquiry.create(data);
    res.status(201).json({ success: true, data: enquiry });
  } catch (err) {
    next(err);
  }
};

// @desc    Create project enquiry
// @route   POST /api/enquiries/project
// @access  Public
export const createProjectEnquiry = async (req, res, next) => {
    try {
      const data = { ...req.body };
      if (data.projectId) {
          data.project = data.projectId;
          delete data.projectId;
      }
      data.projectType = 'Project Specific';
      
      const enquiry = await Enquiry.create(data);
      res.status(201).json({ success: true, data: enquiry });
    } catch (err) {
      next(err);
    }
  };

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id/status
// @access  Private (Admin)
export const updateEnquiryStatus = async (req, res, next) => {
  try {
    let enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, error: 'Enquiry not found' });
    }

    enquiry.status = req.body.status;
    await enquiry.save();

    res.status(200).json({ success: true, data: enquiry });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (Admin)
export const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, error: 'Enquiry not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

// @desc    Get enquiry stats
// @route   GET /api/enquiries/stats
// @access  Private (Admin)
export const getEnquiryStats = async (req, res, next) => {
    try {
        const total = await Enquiry.countDocuments();
        const newEnquiries = await Enquiry.countDocuments({ status: 'new' });
        const contacted = await Enquiry.countDocuments({ status: 'contacted' });
        const closed = await Enquiry.countDocuments({ status: 'closed' });
        
        // Last week (simple approx)
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const lastWeek = await Enquiry.countDocuments({ createdAt: { $gte: oneWeekAgo } });

        res.status(200).json({
            success: true,
            data: {
                total,
                new: newEnquiries,
                contacted,
                closed,
                lastWeek
            }
        });
    } catch (err) {
        next(err);
    }
};
