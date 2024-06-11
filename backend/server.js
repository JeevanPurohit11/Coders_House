require('dotenv').config();  // Use credentials from .env file
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5500;
const bodyParser = require('body-parser');
const DbConnect = require('./database');
const cors = require('cors');

const corsOptions = {
    origin: ['http://localhost:3000'],  // Allow requests from the frontend
};

app.use(cors(corsOptions));
app.use(bodyParser.json());  // Enable JSON middleware

// Connect to the database
DbConnect();

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello from express Js');
});

// Import and use router
const router = require('./routes');
app.use('/api', router);  // Prefix the routes with /api

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
