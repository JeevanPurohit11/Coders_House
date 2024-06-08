const mongoose= require('mongoose');

function DbConnect(){
   const DB_URL = process.env.DB_URL;     // URL of our database 

   mongoose.connect(DB_URL,{       // common struture use always in database connection
      useNewUrlParser : true,
      useUnifiedTopology : true,
      useFindAndModify : false,
   });
   const db=mongoose.connection;   //storing our moongose connection
   db.on('error',console.error.bind(console , 'connection error : '));
   db.once('open',()=>{
       console.log('DB Connected ....');
   });
}

module.exports = DbConnect;