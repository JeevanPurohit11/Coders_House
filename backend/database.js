const mongoose = require('mongoose');

function DbConnect() {
   console.log('coming here...', process.env.DB_URL);
   const DB_URL = process.env.DB_URL;  // URL of our database 

   mongoose.connect(DB_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
   }).then(() => {
      console.log('DB Connected ....');
   }).catch((error) => {
      console.error('Connection error:', error);
   });
}

module.exports = DbConnect;
