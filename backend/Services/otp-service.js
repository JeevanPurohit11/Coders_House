const crypto = require("crypto");

class otpServices{
    
   async generateOtp(){    
        const otp=crypto.randomInt(1000,9999);
        return otp;     // return promise
    }
    sendBySms() {}

    verifyOtp() {}
}

module.exports= new otpServices();