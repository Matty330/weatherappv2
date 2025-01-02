import { Router } from 'express';
import weatherRoutes from './weatherRoutes.js'; // Explicit file extension for ESM compatibility

const router = Router();

// Connect weather routes
router.use('/weather', weatherRoutes);

export default router;
