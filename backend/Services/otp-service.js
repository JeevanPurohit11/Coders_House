const crypto = require("crypto");


const smsSid=process.env.smsSid; 
const smsAuthToken=process.env.smsAuthToken;
const twilio=require('twilio')(smsSid,smsAuthToken,{
    lazyLoading: true              // writen for obtimized working.
})
class otpServices{
    
   async generateOtp(){    
        const otp=crypto.randomInt(1000,9999);
        return otp;     // return promise
    }
    async sendBySms(phone ,otp ) {
        return await twilio.messages.create({
           to : phone,
           from : process.env.SMS_FROM_NUMBER,
           body : `Your COderHouse project started sending otp to Rakesh :  ${otp}`,
        });
    }

    verifyOtp() {}
}

module.exports= new otpServices();