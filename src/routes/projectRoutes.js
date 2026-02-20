// src/routes/projectRoutes.js
import express from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectBySlug,
  toggleActive,
  toggleFeatured
} from '../controllers/projectController.js';
import { protect, authorize } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

// Middleware to protect routes (placeholder for now)
// const protect = (req, res, next) => {
//   // Implement authentication logic here
//   next();
// };

const router = express.Router();

router
  .route('/')
  .get(getProjects)
  .post(protect, authorize('admin'), upload.array('images'), createProject);

router.get('/slug/:slug', getProjectBySlug);

router.patch('/:id/toggle-active', protect, authorize('admin'), toggleActive);
router.patch('/:id/toggle-featured', protect, authorize('admin'), toggleFeatured);

router
  .route('/:id')
  .get(getProject)
  .put(protect, authorize('admin'), upload.array('images'), updateProject)
  .delete(protect, authorize('admin'), deleteProject);

export default router;
