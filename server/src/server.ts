import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/index.js'; // Ensure correct path with extension

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files
app.use(express.static('client'));

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect routes
app.use(routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
