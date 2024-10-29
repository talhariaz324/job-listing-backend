import fs from 'fs';
import { DATA_FILE_PATH } from '../config/config.js';

export const readJobs = () => {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE_PATH, 'utf8'));
  } catch (error) {
    return []; //TODO: Try to handle this error in a better way.
  }
};

export const writeJobs = (data) => {
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));
};
