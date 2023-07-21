const express = require('express');
const app = express();

// Middleware to parse query parameters
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper function to check if a number is valid
function isValidNumber(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
}

// Route for calculating the mean (average)
app.get('/mean', (req, res) => {
  const nums = req.query.nums;

  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numList = nums.split(',');
  const validNums = numList.filter(isValidNumber).map(Number);

  if (validNums.length === 0 || validNums.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid numbers provided' });
  }

  const mean = validNums.reduce((acc, num) => acc + num, 0) / validNums.length;
  res.json({ operation: 'mean', value: mean });
});

// Route for calculating the median (midpoint)
app.get('/median', (req, res) => {
  const nums = req.query.nums;

  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numList = nums.split(',');
  const validNums = numList.filter(isValidNumber).map(Number);

  if (validNums.length === 0 || validNums.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid numbers provided' });
  }

  validNums.sort((a, b) => a - b);

  let median;
  const midIndex = Math.floor(validNums.length / 2);

  if (validNums.length % 2 === 0) {
    median = (validNums[midIndex - 1] + validNums[midIndex]) / 2;
  } else {
    median = validNums[midIndex];
  }

  res.json({ operation: 'median', value: median });
});

// Route for calculating the mode (most frequent)
app.get('/mode', (req, res) => {
  const nums = req.query.nums;

  if (!nums) {
    return res.status(400).json({ error: 'nums are required' });
  }

  const numList = nums.split(',');
  const validNums = numList.filter(isValidNumber).map(Number);

  if (validNums.length === 0 || validNums.some(isNaN)) {
    return res.status(400).json({ error: 'Invalid numbers provided' });
  }

  const frequencyMap = {};
  let maxFrequency = 0;
  let mode;

  validNums.forEach(num => {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    if (frequencyMap[num] > maxFrequency) {
      maxFrequency = frequencyMap[num];
      mode = num;
    }
  });

  res.json({ operation: 'mode', value: mode });
});

// Error handling middleware for handling invalid routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Run the server on port 3000
const server = app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

module.exports = { app, server };

