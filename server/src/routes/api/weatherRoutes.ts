import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const router = Router();
const __filename = fileURLToPath(import.meta.url); // Use fileURLToPath to get the current file path
const __dirname = path.dirname(__filename); // Get the directory name
const historyFilePath = path.resolve(__dirname, '../../../searchHistory.json');

// Get all saved cities from search history
router.get('/history', (_req, res) => {
  fs.readFile(historyFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading search history:', err);
      return res.status(500).json({ error: 'Error reading search history' });
    }

    const history = JSON.parse(data || '[]');
    res.json(history);
  });
});

// Save a city and return weather data
router.post('/', (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  fs.readFile(historyFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading search history:', err);
      return res.status(500).json({ error: 'Error reading search history' });
    }

    const history = JSON.parse(data || '[]');
    const newEntry = { id: uuidv4(), city };
    history.push(newEntry);

    fs.writeFile(historyFilePath, JSON.stringify(history, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error saving search history:', writeErr);
        return res.status(500).json({ error: 'Error saving search history' });
      }

      res.status(201).json(newEntry);
    });
  });
});

export default router;
