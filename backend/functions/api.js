// Netlify automatically loads environment variables from the dashboard
// No need to load .env file in production (it doesn't exist in deployment)
// For local testing with netlify dev, use .env file
const path = require('path');
const fs = require('fs');

// Only load .env if it exists (local development)
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
}

const serverless = require('serverless-http');
const app = require('../server');

// Export the serverless handler
// Netlify will invoke this handler for all /api/* requests
module.exports.handler = serverless(app);

