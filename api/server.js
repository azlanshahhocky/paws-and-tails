// Vercel serverless function entry point
// This file imports and exports the Express app for serverless deployment

const app = require('../server');

// Export the Express app for Vercel serverless
module.exports = app;
