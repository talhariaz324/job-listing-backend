import axios from 'axios';
import { readJobs, writeJobs } from '../utils/jobUtils.js';


// My helper function to process the job.
const processJob = async (newJob, jobs) => {
    const delay = Math.floor(Math.random() * 60) * 5 * 1000;
    
    setTimeout(async () => {
        try {
            const response = await axios.get('https://source.unsplash.com/random/300x300/?food');
            newJob.status = 'resolved';
            newJob.result = response.request.res.responseUrl;
            writeJobs(jobs);
        } catch (error) {
            newJob.status = 'failed';
            writeJobs(jobs);
        }
    }, delay);
};

const createJob = async (req, res) => {
    try {
        const jobs = readJobs();
        const jobId = jobs.length + 1;
        const newJob = { id: jobId, status: 'pending', result: null };
        jobs.push(newJob);
        writeJobs(jobs);

        // Process job asynchronously
        processJob(newJob, jobs);

        res.json({ jobId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create job' });
    }
};

const getAllJobs = async (req, res) => {
    try {
        const jobs = readJobs();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
};

const getJobById = async (req, res) => {
    try {
        const jobId = parseInt(req.params.id);
        const jobs = readJobs();
        const job = jobs.find(j => j.id === jobId);
        
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        
        res.json(job);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch job' });
    }
};

// Add this at the bottom of the file
export { createJob, getAllJobs, getJobById };


