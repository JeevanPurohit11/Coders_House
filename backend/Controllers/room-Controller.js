const RoomDto = require("../dtos/room-dto");
const roomService= require('../Services/room-service');

class RoomController{
   async create(req,res){
      const {topic,roomType}= req.body;
      if(!topic || !roomType){
        return res.status(400).json({message : "All fields are required."});
      }
      const room = await roomService.create({
         topic,
         roomType,
         ownerId : req.user._id,
      });

      return res.json(new RoomDto(room));
   }
   async index(req,res){
      const rooms=await roomService.getAllRooms(['open']);  //by default show open rooms  
      const allRooms=rooms.map((room)=>new RoomDto(room)); //we will do here pajination so , it will easy to fetch all those rooms
      return res.json(allRooms);
   }
}

module.exports = new RoomController; 

//1 : 08