import fs from 'fs';
import path from 'path';
import { Job } from '../types/job.type';

const jobsFilePath = path.resolve(__dirname, '../data/jobs.json');

export const readJobs = (): Job[] => {
  try {
    
    const data = JSON.parse(fs.readFileSync(jobsFilePath, 'utf8'));
    return data || [];

  } catch (error: unknown) {
    throw new Error(`Failed to read jobs: ${(error as Error).message}`);
  }
};

export const writeJobs = (data: Job[]) => {
  fs.writeFileSync(jobsFilePath, JSON.stringify(data, null, 2));
};
