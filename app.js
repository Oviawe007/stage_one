const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Define the endpoint
app.get('/api', (req, res) => {
  // Get query parameters
  const slackName = req.query.slack_name;
  const track = req.query.track;

  // Validate and get current day of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const currentDay = daysOfWeek[currentDate.getUTCDay()];

  
    // Validate and get current UTC time within +/-2 minutes
    const currentUTCTime = new Date();
    // const currentUTCMinutes = currentUTCTime.getUTCMinutes();
    const currentUTCHours = currentUTCTime.getUTCHours();
    const currentUTCMinutes = currentUTCTime.getUTCMinutes();
    const currentUTCSeconds = currentUTCTime.getUTCSeconds();

    // if (
    // currentUTCHours < -2 || currentUTCHours > 2 ||
    // currentUTCMinutes < -2 || currentUTCMinutes > 2
    // ) {
    // return res.status(400).json({ error: 'Invalid UTC time range' });
    // }


    // Format the UTC time as needed
    const formattedUTCTime =
    currentUTCTime.getUTCFullYear() +
    '-' +
    String(currentUTCTime.getUTCMonth() + 1).padStart(2, '0') + // Months are 0-based
    '-' +
    String(currentUTCTime.getUTCDate()).padStart(2, '0') +
    'T' +
    String(currentUTCTime.getUTCHours()).padStart(2, '0') +
    ':' +
    String(currentUTCTime.getUTCMinutes()).padStart(2, '0') +
    ':' +
    String(currentUTCSeconds).padStart(2, '0') +
    'Z';


  // Get GitHub URL of the file being run and full source code URL
  const fileURL = 'https://github.com/Oviawe007/stage_one/blob/main/app.js';
  const sourceCodeURL = 'https://github.com/Oviawe007/stage_one';

  // Prepare response JSON
  const responseData = {
    slack_name: slackName,
    current_day: currentDay,
    utc_time: formattedUTCTime,
    track: track,
    github_file_url: fileURL,
    github_repo_url: sourceCodeURL,
    status: 200
  };

  res.status(200).json(responseData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
