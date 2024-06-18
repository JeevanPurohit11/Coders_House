const tokenServices = require("../Services/token-services");

// work in between our request and response if middleware allow then only further thing works(request and response)
module.exports= async function(req,res,next) {
     
    try{
       const accessToken = req.cookies.accessToken;
       if(!accessToken){
        return res.status(401).json({ message: 'Access token is required' });
       }
       const {userData} = await tokenServices.verifyAccessToken(accessToken);
       if(!userData){
           return res.status(401).json({ message: 'Invalid access token' });
       }
       req.user= userData;    // taking only id of user from all data 

       console.log(accessToken);
       console.log(userData);
       next();   // allow to complete request or response.
    }catch(err){
        res.status(401).json({message : 'Invalid Token'});
    }
   
}