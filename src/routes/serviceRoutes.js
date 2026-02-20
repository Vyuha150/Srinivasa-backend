import express from 'express';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  toggleServiceStatus
} from '../controllers/serviceController.js';
import { protect, authorize } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router
  .route('/')
  .get(getServices)
  .post(protect, authorize('admin'), upload.single('image'), createService);

router
  .route('/:id')
  .get(getService)
  .put(protect, authorize('admin'), upload.single('image'), updateService)
  .delete(protect, authorize('admin'), deleteService);

router.put('/:id/toggle', protect, authorize('admin'), toggleServiceStatus);

export default router;
