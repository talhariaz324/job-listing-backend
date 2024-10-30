import { Request, Response } from 'express';
import * as jobService from '../services/job.service';

const createJob = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await jobService.create();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create job' });
    }
};

const getAllJobs = async (req: Request, res: Response): Promise<void> => {
    try {
        const jobs = await jobService.getAll();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
};

const getJobById = async (req: Request, res: Response): Promise<void> => {
    try {
        const jobId = parseInt(req.params.id);
        const job = await jobService.getById(jobId);
        res.json(job);
    } catch (error: unknown) {
        if (error instanceof Error && error.message === 'Job not found') {
             res.status(404).json({ error: 'Job not found' });
        }
        res.status(500).json({ error: 'Failed to fetch job' });
    }
};

export { createJob, getAllJobs, getJobById };


