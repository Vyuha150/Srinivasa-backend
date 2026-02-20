import express from 'express';
import {
  getEnquiries,
  getEnquiry,
  createEnquiry,
  createProjectEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
  getEnquiryStats
} from '../controllers/enquiryController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/')
  .get(protect, authorize('admin'), getEnquiries)
  .post(createEnquiry);

router.post('/project', createProjectEnquiry);
router.get('/stats', protect, authorize('admin'), getEnquiryStats);

router
  .route('/:id')
  .get(protect, authorize('admin'), getEnquiry)
  .delete(protect, authorize('admin'), deleteEnquiry);

router.put('/:id/status', protect, authorize('admin'), updateEnquiryStatus);

export default router;
