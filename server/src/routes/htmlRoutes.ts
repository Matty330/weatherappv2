import path from 'path';
import { Router } from 'express';

const router = Router();

// Serve the main index.html file
router.get('*', (_req, res) => { // Changed req to _req to suppress unused variable error
  res.sendFile(path.resolve(__dirname, '../../../client/index.html')); // Adjusted path for client
});

export default router;
