const otpServices = require('../Services/otp-service')
const hashService = require('../Services/hash-services')
const crypto = require('crypto');
const otpService = require('../Services/otp-service');
const userService = require('../Services/user-service');
const tokenService = require('../Services/token-services');

class AuthController {

    async sendOtp(req, res) {

        const { phone } = req.body; // Destructure req.body to get the phone number
        if (!phone) { // Check if phone number is provided
            return res.status(400).json({ message: 'phone field is required' }); 
        }
        const otp= await otpServices.generateOtp();     // recieved promise
        
        const TTL = 1000 * 60 * 2 //2 minute;
        const expire= Date.now() + TTL ;  // otp activation time
        const data =`${phone}.${otp}.${expire}`;    // this three thing are store in our hash;
        const hash = hashService.hashOtp(data);

         
        //sending live OTP
        try{
            //await otpServices.sendBySms(phone,otp);
            return res.json({
                hash : `${hash}.${expire}`,
                phone,
                otp,
            })
        }catch(err){
            console.log(err);
           return res.status(500).json({message : 'message sending failed'});
        }

    //   let x=  crypto.randomBytes(64).toString('hex');
    //      res.json({ x : x}); // Send response if phone number is provided


     //HASHING OF OTP
    } 
    
  //  verify OTP
  async  verifyOtp(req,res){
         const { otp, hash, phone }= req.body;
         if(!otp || !hash || !phone) {
          return res.status(400).json({message : "All fields are required. "});
         }
         const [hashOtp , expire]= hash.split('.');
         if(Date.now() > +expire){                                         // + convert into time (int) not a string
           return  res.status(400).json({message : "OTP expired."})
         }

         const data = `${phone}.${otp}.${expire}`;

         const isValid = otpService.verifyOtp(hashOtp,data);

         if(!isValid){
           return res.status(400).json({message : "InValid OTP"})
         }

         let user;
         // in Js when key ans pair both are same we can write in single ({phone})
         try{
              user = await userService.findUser({phone : phone }) ;  
              if(!user){
                   user =await userService.createUser({phone : phone});
              }   
         }catch(err){
             console.log(err);
            return res.status(500).json({message : 'DB error.'});
         }

         //token generating (JWT) javascript web token .(we doesnt have session here ,both frontend and backend are not connected , 
       //  . if we have token then we can logined in ,on each request we will send this token on server )
       // and server verify it ,if verified then server will send protected data to us .
        const {accessToken, refreshToken} = tokenService.generateTokens({ _id : user._id, activated : false});
//token valid for 1 month 30 days
        res.cookie('refreshToken',refreshToken, {
            maxAge : 1000 *60 * 60* 24 * 30,
            httpOnly : true,
        });

        return res.json({accessToken});
     }
}

module.exports = new AuthController(); // Instantiate and export the AuthController class
