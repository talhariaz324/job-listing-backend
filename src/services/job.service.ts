import axios from "axios";
import { generateUniqueId, readJobs, writeJobs } from "../utils/helper";
import { Job } from "../types/job.type";
import { processJob } from "../utils/unsplash";

const create = async () => {
  const jobs = readJobs();
  const jobId = generateUniqueId();
  const newJob: Job = { id: jobId, status: "pending" };
  jobs.push(newJob);
  writeJobs(jobs);

  // Process job asynchronously
  processJob(newJob);

  return { jobId };
};

const getAll = async () => {
  return readJobs();
};

const getById = async (jobId: string) => {
  const jobs = readJobs();
  const job = jobs.find((j: Job) => j.id === jobId);

  if (!job) {
    throw new Error("Job not found");
  }

  return job;
};

export { create, getAll, getById };
