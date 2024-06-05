require('dotenv').config  //(1) we can use all credetial avaialable in .env
const express=require('express');  // (2)imported express
const app = express();  //called(3)
const PORT= process.env.PORT || 5500; // (4)if given port by env in not avialable so run our server on PORT 5500

//creating th route
app.get('/',(req,res)=>{
  res.send('Hello from express Js');
});


app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));   //(5) print this message ,when server run(server has been created in this 5 line)

