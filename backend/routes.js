//all our routes will be store here
//creating router (Router is bascially a function)
// const router=require('express').Router();   // our express router has been created inside router.
const authController = require('./Controllers/auth-controller');  //imported
const router = require('express').Router();
const activateController = require('./Controllers/activate-controller');
const authMiddleware = require('./Middlewares/auth-middleware');
const roomController=require('./Controllers/room-Controller')

 //our first request would be post request.
router.post('/api/send-otp', authController.sendOtp);
router.post('/api/verify-otp',authController.verifyOtp);
router.post('/api/activate',authMiddleware,activateController.activate);
router.get('/api/refresh',authController.refresh);   //get request
// router.post('/api/logout',authMiddleware,authController.logout); //we make this request if user was login , if no user login then we cannot able to make this request so we use middleware to check if user login or not 
router.post('/api/logout', authMiddleware, authController.logout);
router.post('/api/rooms', authMiddleware , roomController.create);

module.exports=router;

