import express from 'express';
import {
  getAmenities,
  getAmenity,
  createAmenity,
  updateAmenity,
  deleteAmenity,
  toggleAmenityStatus
} from '../controllers/amenityController.js';
import { protect, authorize } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router
  .route('/')
  .get(getAmenities)
  .post(protect, authorize('admin'), upload().single('image'), createAmenity);

router
  .route('/:id')
  .get(getAmenity)
  .put(protect, authorize('admin'), upload().single('image'), updateAmenity)
  .delete(protect, authorize('admin'), deleteAmenity);

router.put('/:id/toggle', protect, authorize('admin'), toggleAmenityStatus);

export default router;
