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
      try {
         const rooms = await roomService.getAllRooms(['open']);  // By default show open rooms  
         const allRooms = rooms.map((room) => new RoomDto(room)); // Pagination can be implemented here
         return res.json(allRooms);
       } catch (error) {
         console.error("Error fetching rooms:", error);
         return res.status(500).json({ message: "Could not fetch rooms" });
       }
   }
}

module.exports = new RoomController; 

//1 : 08