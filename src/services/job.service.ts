import axios from 'axios';
import { readJobs, writeJobs } from '../utils/helper';
import { Job } from '../types/job.type';

const processJob = async (newJob: Job, jobs: Job[]) => {
    const delay = Math.floor(Math.random() * 10) * 1000;
    setTimeout(async () => {
        try {
            // Get fresh copy of jobs before updating
            const currentJobs = readJobs();
            const jobIndex = currentJobs.findIndex(job => job.id === newJob.id);
            
            if (jobIndex === -1) {
                console.error('Job not found during processing');
                return;
            }

            const response = await axios.get('https://api.unsplash.com/search/photos', {
                params: { query: 'food', per_page: 1 },
                headers: {
                  Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
                }
            });

            // Update the specific job in the fresh copy
            currentJobs[jobIndex].status = 'resolved';
            currentJobs[jobIndex].result = response.data.results[0].urls.full;
            
            // Write the updated jobs back to file
            writeJobs(currentJobs);
        } catch (error) {
            console.log(error);
            
            newJob.status = 'failed';
            writeJobs(jobs);
        }
    }, 10000);
};

const create = async () => {
    const jobs = readJobs();
    const jobId = jobs.length + 1;
    const newJob: Job = { id: jobId, status: 'pending', result: null };
    jobs.push(newJob);
    writeJobs(jobs);
    
    // Process job asynchronously
    processJob(newJob, jobs);
    
    return { jobId };
};

const getAll = async () => {
    return readJobs();
};

const getById = async (jobId: number) => {
    const jobs = readJobs();
    const job = jobs.find((j: Job) => j.id === jobId);
    
    if (!job) {
        throw new Error('Job not found');
    }
    
    return job;
};

export { create, getAll, getById };
