import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dashboardRoutes from './routes/dashboard.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.send({ status: 'Loan portfolio analytics API', version: '0.1.0' });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
