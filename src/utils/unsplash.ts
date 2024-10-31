import axios from "axios";
import { Job } from "../types/job.type";
import { readJobs, writeJobs } from "./helper";

export const processJob = async (newJob: Job, jobs: Job[]) => {
  const delay = Math.floor(Math.random() * (300 - 5 + 1) + 5) * 1000;
  setTimeout(async () => {
    try {
      // Get fresh copy of jobs before updating
      const currentJobs = readJobs();
      const jobIndex = currentJobs.findIndex((job) => job.id === newJob.id);

      if (jobIndex === -1) return;

      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: { query: "food", per_page: 1 },
          headers: {
            Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
          },
        }
      );

      // Update the specific job in the fresh copy
      currentJobs[jobIndex].status = "resolved";
      currentJobs[jobIndex].result = response.data.results[0].urls.full;

      // Write the updated jobs back to file
      writeJobs(currentJobs);
    } catch (error) {
      throw new Error("Failed to process job");
    }
  }, delay);
};
