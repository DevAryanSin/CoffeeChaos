// Load environment variables for serverless context
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const serverless = require('serverless-http');
const app = require('../server');

// Export the serverless handler
// Netlify will invoke this handler for all /api/* requests
module.exports.handler = serverless(app);

