import express from 'express';
import { createJob, getAllJobs, getJobById } from '../controllers/jobController.js';

const router = express.Router();

router.post('/jobs', createJob);
router.get('/jobs', getAllJobs);
router.get('/jobs/:id', getJobById);

export default router;
