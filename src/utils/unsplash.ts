import axios from "axios";
import { Job } from "../types/job.type";
import { readJobs, writeJobs } from "./helper";
import {  WebSocket } from 'ws';

import { wss } from "../server"; 

const retryQueue: Job[] = [];
const retryInterval = 1 * 60 * 1000; 

export const processJob = async (newJob: Job) => {
  const delay = Math.floor(Math.random() * (300 - 5 + 1) + 5) * 1000;
  setTimeout(async () => {
    try {
      const currentJobs = readJobs();
      const jobIndex = currentJobs.findIndex((job) => job.id === newJob.id);

      if (jobIndex === -1) return;

      const response = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          params: { query: "food" },
          headers: {
            "Accept-Version": "v1",
            Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
          },
        }
      );

      currentJobs[jobIndex].status = "resolved";
      currentJobs[jobIndex].result = response.data.urls.full;
      writeJobs(currentJobs);

      wss.clients.forEach((client: WebSocket) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ job: currentJobs[jobIndex] }));
        }
      });
    } catch (error) {
      retryQueue.push(newJob);
    }
  }, delay);
};

const processRetryQueue = () => {
  setInterval(async () => {
    if (retryQueue.length > 0) {
      const jobToRetry = retryQueue.shift();
      if (jobToRetry) {
        await processJob(jobToRetry); // Reprocess the job
      }
    }
  }, retryInterval);
};

// Start processing the retry queue
processRetryQueue();
