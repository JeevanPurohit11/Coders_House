const UserModel = require('../models/user-model');

 class userService{
      
    async findUser(filter){
        const user = await UserModel.findOne(filter);     //findOne is inbuld mongodb as a method.
        return user;
    }
    async createUser(data){
        const user = await UserModel.create(data);     //create is inbuld mongodb as a method.
        return user;
    }

}

module.exports = new userService();