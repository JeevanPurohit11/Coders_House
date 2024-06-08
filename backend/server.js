require('dotenv').config();  // (1) We can use all credentials available in .env
const express = require('express');  // (2) Imported express
const app = express();  // (3) Called
const PORT = process.env.PORT || 5500; // (4) If given port by env is not available, run our server on PORT 5500
const bodyParser = require('body-parser');  //imported
const DbConnect = require('./database');   // connecting DB with server

DbConnect();   // connected

// Creating the route. Rather than giving logic here, I will implement logic in another file and use it here.
app.get('/', (req, res) => {
  res.send('Hello from express Js');
});

app.use(bodyParser.json());  // enable json middlever ,which come inbuild in express

// Import router
const router = require('./routes');
app.use(router);  // Registered router (now express knows this router exists)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));  // (5) Print this message when server runs (server has been created in this 5 lines)
//3 : 13 : 00