const path = require('path');
const fs = require('fs');

const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
}

const serverless = require('serverless-http');
const app = require('../server');

module.exports.handler = serverless(app);

