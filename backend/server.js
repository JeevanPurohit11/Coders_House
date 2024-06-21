require('dotenv').config();  // Use credentials from .env file
const express = require('express');
const app = express();
const DbConnect = require('./database');
const cors = require('cors');
const cookieParser=require('cookie-parser');
// Connect to the database
DbConnect();

app.use(cookieParser());
// Define CORS options
const corsOptions = {
    credentials: true,                 // for getting cookie/tokens easily
    origin: 'http://localhost:3000',  // Allow requests from the frontend
};
// Use CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // Handle preflight requests(chatgpt)

app.use(express.json({limit : '8mb'}));  // Enable JSON middleware // limit for max size length of avatar/image

// Import and use router
const router = require('./routes');
app.use(router);  // Prefix the routes with /api



// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello from express Js');
});


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

