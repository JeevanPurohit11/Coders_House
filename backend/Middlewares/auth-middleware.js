const tokenServices = require("../Services/token-services");

// work in between our reuest and response if middleware allow then only further thing works(request and response)
module.exports= async function(req,res,next) {
     
    try{
       const {accessToken} = req.cookies;
       if(!accessToken){
           throw new Error();
       }
       const {userData} = tokenServices.verifyAccessToken(accessToken);
       if(!userData){
          throw new Error();
       }
       req.user= userData;    // taking only id of user from all data 

       console.log(accessToken);
       console.log(userData);
       next();   // allow to complete request or response.
    }catch(err){
        res.status(401).json({message : 'Invalid Token'});
    }
    next();
}