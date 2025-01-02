import { Router } from 'express';
import apiRoutes from './api/index.js'; // Explicitly reference index.js

const router = Router();

// Connect API routes
router.use('/api', apiRoutes);

export default router;
