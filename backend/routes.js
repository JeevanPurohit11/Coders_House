//all our routes will be store here
//creating router (Router is bascially a function)
// const router=require('express').Router();   // our express router has been created inside router.
const authController = require('./Controllers/auth-controller');  //imported
const router = require('express').Router();
const activateController = require('./Controllers/activate-controller');
const authMiddleware = require('./Middlewares/auth-middleware');


 //our first request would be post request.
router.post('/api/send-otp', authController.sendOtp);
router.post('/api/verify-otp',authController.verifyOtp);
 //router.post('/api/activate',authMiddleware,activateController.activate);


module.exports=router;

