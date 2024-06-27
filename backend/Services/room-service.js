const RoomModel= require('../models/room-model'); 
class RoomService{
    async create(payload){
        const {topic, roomType, ownerId} = payload;
        const room = await RoomModel.create({
            topic,
            roomType,
            ownerId,
            speakers : [ownerId],   //by default the owner of room will be speaker
        });
        return room;
    }
    async getAllRooms(types){
           const rooms= await RoomModel.find({roomType : { $in : types}});  //all array element(open,social,private )will be fetched here
    }
}
module.exports= new RoomService();
