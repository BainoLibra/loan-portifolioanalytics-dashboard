import express from 'express';
import {
  getSummary,
  getDefaultingClients,
  getTopOfficers,
  getBranchGrowth,
  getPortfolioAtRisk,
} from '../controllers/dashboardController.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.use(authenticateToken);
router.get('/summary', getSummary);
router.get('/defaulting-clients', getDefaultingClients);
router.get('/top-officers', getTopOfficers);
router.get('/branch-growth', getBranchGrowth);
router.get('/par', getPortfolioAtRisk);

export default router;
