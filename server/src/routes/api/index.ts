import { Router } from 'express';
import htmlRoutes from './htmlRoutes';
import weatherRoutes from './weatherRoutes';

const router = Router();

// Connect the HTML route
router.use('/', htmlRoutes);

// Connect the weather API routes
router.use('/api/weather', weatherRoutes);

export default router;
