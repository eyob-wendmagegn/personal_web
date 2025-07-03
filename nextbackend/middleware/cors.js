const cors = require('cors');

const corsMiddleware = cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], // Allow frontend dev server
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'], // Allow necessary HTTP methods
  allowedHeaders: ['Content-Type', 'Accept', 'Cache-Control', 'Pragma'], // Allow required headers
  optionsSuccessStatus: 200, // Respond 200 to OPTIONS preflight requests
  credentials: false, // No credentials needed for now
});

module.exports = corsMiddleware;