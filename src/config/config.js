import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const DATA_FILE_PATH = './src/data/jobs.json'; //TODO: Why we should pass the path like this in environment variable?

