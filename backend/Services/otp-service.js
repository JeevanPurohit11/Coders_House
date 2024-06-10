const crypto = require('crypto');
const hashService = require('./hash-services');

// const smsSid=process.env.smsSid; 
// const smsAuthToken=process.env.smsAuthToken;
const twilio=require('twilio')(process.env.SMS_SID,process.env.SMS_AUTH_TOKEN,{
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
           body : ` Jay Data re Sa ...the COderHouse project preparing by Jeevan started sending otp to Rakesh to Login(Otp came from Jeevan Code ..) :  ${otp}`,
        });
    }

     verifyOtp(hashedOtp, data) {             //checking sended hashed otp + original otp matches
        let computedHash = hashService.hashOtp(data);
        return computedHash === hashedOtp;
    }
}

module.exports= new otpServices();