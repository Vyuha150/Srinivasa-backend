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
