import { Request, Response } from "express";
import * as jobService from "../services/job.service";

const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await jobService.create();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to create job" });
  }
};

const getAllJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await jobService.getAll();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

const getJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobId = req.params.id;
    const job = await jobService.getById(jobId);
    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch job" });
  }
};

export { createJob, getAllJobs, getJobById };
