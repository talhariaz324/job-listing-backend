import express from 'express';
import { PORT } from './src/config/config.js';
import jobRoutes from './src/routes/jobRoutes.js';

const app = express();

app.use(express.json());

// Routes
app.use('/jobs', jobRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});