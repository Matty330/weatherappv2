import path from 'path';
import { Router } from 'express';

const router = Router();

// Serve the main index.html file
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../../client/index.html')); 
});

export default router;
