import Project from '../models/Project.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit', 'active', 'featured'];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

    // Handle special filters mapping
    if (req.query.active) {
       reqQuery.isActive = req.query.active === 'true';
    }
    if (req.query.featured) {
       reqQuery.isFeatured = req.query.featured === 'true';
    }

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    query = Project.find(JSON.parse(queryStr));

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      // Sort by order by default if available, otherwise createdAt
      query = query.sort('order -createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Project.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const projects = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      pagination,
      data: projects
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.status(200).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req, res, next) => {
  try {
    // Handle file uploads
    if (req.files && req.files.length > 0) {
        req.body.images = req.files.map(file => file.path.replace(/\\/g, '/'));
        // Set first image as main image if not provided
        if (!req.body.image) {
            req.body.image = req.body.images[0];
        }
    }

    // Parse JSON fields
    const jsonFields = ['tags', 'highlights', 'amenities', 'specifications'];
    jsonFields.forEach(field => {
        if (typeof req.body[field] === 'string') {
            try {
                req.body[field] = JSON.parse(req.body[field]);
            } catch (e) {}
        }
    });

    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
        return res.status(404).json({ success: false, error: 'Project not found' });
    }

    // Handle file uploads
    if (req.files && req.files.length > 0) {
        const newImages = req.files.map(file => file.path.replace(/\\/g, '/'));
        req.body.images = [...project.images, ...newImages];
        
        // Update main image if not set
        if (!project.image && newImages.length > 0) {
             req.body.image = newImages[0];
        }
    }

    // Parse JSON fields
    const jsonFields = ['tags', 'highlights', 'amenities', 'specifications'];
    jsonFields.forEach(field => {
        if (typeof req.body[field] === 'string') {
            try {
                req.body[field] = JSON.parse(req.body[field]);
            } catch (e) {}
        }
    });

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

// @desc    Get project by slug
// @route   GET /api/projects/slug/:slug
// @access  Public
export const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.status(200).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle project active status
// @route   PATCH /api/projects/:id/toggle-active
// @access  Private (Admin)
export const toggleActive = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }

        project.isActive = !project.isActive;
        await project.save();

        res.status(200).json({ success: true, data: project });
    } catch (err) {
        next(err);
    }
};

// @desc    Toggle project featured status
// @route   PATCH /api/projects/:id/toggle-featured
// @access  Private (Admin)
export const toggleFeatured = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }

        project.isFeatured = !project.isFeatured;
        await project.save();

        res.status(200).json({ success: true, data: project });
    } catch (err) {
        next(err);
    }
};
