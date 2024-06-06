//all our routes will be store here
//creating router (Router is bascially a function)
const router=require('express').Router();   // our express router has been created inside router.
const authController = require('./Controllers/auth-controller');  //imported


 //our first request would be post request.
router.post('/api/send-otp', authController.sendOtp);



module.exports=router;
