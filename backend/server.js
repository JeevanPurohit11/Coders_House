require('dotenv').config();  // Use credentials from .env file
const express = require('express');
const app = express();
const DbConnect = require('./database');
const cors = require('cors');
// Connect to the database
DbConnect();
// Import and use router
const router = require('./routes');
app.use(router);  // Prefix the routes with /api

const corsOptions = {
    Credential : true,                 //for getting cookie //tokens easily
    origin: ['http://localhost:3000'],  // Allow requests from the frontend
};

app.use(cors(corsOptions));
app.use(express.json());  // Enable JSON middleware


// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello from express Js');
});


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
