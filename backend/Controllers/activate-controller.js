const Jimp=require('jimp');
const path = require('path');
const userService = require('../Services/user-service');
const userDto = require('../dtos/user-dto');


class ActivateController{

    async activate(req,res){
        const { name, avatar} =req.body;
        if(!name || !avatar){
           return res.status(400).json({message : 'All fields are required..'})
        }

       // our image is base64 string ,we have to convert it into image ans store into our fileSystem we use nodemodulejs (buffer)
       const buffer = Buffer.from(avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), 'base64'); //converting string into nodejs buffer. 
       
       const imagePath = `${Date.now()}-${Math.round(
        Math.random() * 1e9 )}.png`;
    // 32478362874-3242342342343432.png //new image path has been make ,using randomvalues 1e9.
//converting image in small size.
       try {
        const jimResp = await Jimp.read(buffer);
        await jimResp.resize(150, Jimp.AUTO).writeAsync(path.resolve(__dirname, `../storage/${imagePath}`)); // Use writeAsync for Promise-based resolution
        } catch (err) {
           return res.status(500).json({ message: 'Could not process the image' });
        }
      
   //storing data
           try{
                const userId= req.user._id;
                const user =await userService.findUser({_id : userId});

                if(!user){
                    res.status(404).json({message : 'user not found'});
                }
                user.activated=true;
                user.name =name;
                user.avatar= `/storage/${imagePath}`;
                await user.save();     // all above thing now will store in our database.
               return res.json({user : new userDto(user), auth : true});
            }catch(err){
               return res.status(500).json({ message: 'something went wrong while storing data inside DB' });
            }

       
    }
}

module.exports= new ActivateController();

