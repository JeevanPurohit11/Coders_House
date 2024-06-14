//to get only properties which we what from whole bunch of properties
class UserDto{
    _id;           //we can also use id = _id 
    phone;
    activated;
    createdAt;

    constructor(user){
        this._id=user._id;
        this.phone=user.phone;
        this.activated=user.activated;
        this.createdAt=user.createdAt;
    }
}
module.exports = UserDto;    // we are just exporting this class not creating object of it .