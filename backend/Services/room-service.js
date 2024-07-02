const RoomModel= require('../models/room-model'); 
class RoomService{
    async create(payload){
        const {topic, roomType, ownerId} = payload;
        if (!topic || !roomType || !ownerId) {
            throw new Error("Missing required fields: topic, roomType, ownerId");
        }
        try {
            const room = await RoomModel.create({
                topic,
                roomType,
                ownerId,
                speakers: [ownerId], // By default, the owner of the room will be a speaker
            });
            return room;
        } catch (error) {
            console.error("Error creating room:", error);
            throw new Error("Could not create room");
        }
    }
    async getAllRooms(types){
        try {
            const rooms = await RoomModel.find({ roomType: { $in: types } })
                .populate('speakers')
                .populate('ownerId')
                .exec(); // All array elements (open, social, private) will be fetched here
                console.log('Fetched rooms:', rooms); // Add this line
            return rooms;
        } catch (error) {
            console.error("Error fetching rooms:", error);
            throw new Error("Could not fetch rooms");
        }
        }
}
module.exports= new RoomService();
