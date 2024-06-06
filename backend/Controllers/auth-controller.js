// All our business logic will be written here in controllers
class AuthController {
    sendOtp(req, res) {
        res.send("Hello from OTP route...........");
    }
}

module.exports = new AuthController(); // Created object for AuthController class and exported it.
