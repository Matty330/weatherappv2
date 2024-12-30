import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const historyFilePath = path.resolve(__dirname, '../../../searchHistory.json');

// Route to get all saved cities from search history
router.get('/history', (req, res) => {
  fs.readFile(historyFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading search history file:', err);
      return res.status(500).json({ error: 'Error reading search history file' });
    }

    const history = JSON.parse(data || '[]');
    res.json(history);
  });
});

// Route to save a city and return weather data (mocked for now)
router.post('/', (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  fs.readFile(historyFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading search history file:', err);
      return res.status(500).json({ error: 'Error reading search history file' });
    }

    const history = JSON.parse(data || '[]');
    const newEntry = { id: uuidv4(), city };
    history.push(newEntry);

    fs.writeFile(historyFilePath, JSON.stringify(history, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing to search history file:', writeErr);
        return res.status(500).json({ error: 'Error saving search history file' });
      }

      // In the future, fetch actual weather data from OpenWeather API
      res.status(201).json(newEntry);
    });
  });
});

export default router;
