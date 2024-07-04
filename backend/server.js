require('dotenv').config();  // Use credentials from .env file
const express = require('express');
const app = express();
const DbConnect = require('./database');
const cors = require('cors');
const cookieParser=require('cookie-parser');
// Connect to the database
DbConnect();

const server= require('http').createServer(app);  //created node server and pass express 
const io=require('socket.io')(server,{
    cors : {
        origin : 'http;//localhost:3000',
        methods : ['GET','POST'],
    },
});

app.use(cookieParser());
// Define CORS options
const corsOptions = {
    credentials: true,                 // for getting cookie/tokens easily
    origin: 'http://localhost:3000',  // Allow requests from the frontend
};
// Use CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // Handle preflight requests(chatgpt)

app.use(express.json({limit : '8mb'}));  // Enable JSON middleware // limit for max size length of avatar/image

// Import and use router
const router = require('./routes');
const ACTIONS = require('../backend/actions');
const { ADD_PEER } = require('./actions');
app.use(router);  // Prefix the routes with /api



// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello from express Js');
});

//mapping for which socket.id is connected with which user.id
// Sockets
const socketUserMap = {};

io.on('connection', (socket) => {
    console.log('New connection', socket.id);
    socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
        socketUserMap[socket.id] = user;
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.ADD_PEER, {
                peerId: socket.id,
                createOffer: false,
                user,
            });
            socket.emit(ACTIONS.ADD_PEER, {
                peerId: clientId,
                createOffer: true,
                user: socketUserMap[clientId],
            });
        });
        socket.join(roomId);
    });

    socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
        io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
            peerId: socket.id,
            icecandidate,
        });
    });

    socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
        io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
            peerId: socket.id,
            sessionDescription,
        });
    });

    socket.on(ACTIONS.MUTE, ({ roomId, userId }) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.MUTE, {
                peerId: socket.id,
                userId,
            });
        });
    });

    socket.on(ACTIONS.UNMUTE, ({ roomId, userId }) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.UNMUTE, {
                peerId: socket.id,
                userId,
            });
        });
    });

    socket.on(ACTIONS.MUTE_INFO, ({ userId, roomId, isMute }) => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            if (clientId !== socket.id) {
                console.log('mute info');
                io.to(clientId).emit(ACTIONS.MUTE_INFO, {
                    userId,
                    isMute,
                });
            }
        });
    });

    const leaveRoom = () => {
        const { rooms } = socket;
        Array.from(rooms).forEach((roomId) => {
            const clients = Array.from(
                io.sockets.adapter.rooms.get(roomId) || []
            );
            clients.forEach((clientId) => {
                io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
                    peerId: socket.id,
                    userId: socketUserMap[socket.id]?.id,
                });

                // socket.emit(ACTIONS.REMOVE_PEER, {
                //     peerId: clientId,
                //     userId: socketUserMap[clientId]?.id,
                // });
            });
            socket.leave(roomId);
        });
        delete socketUserMap[socket.id];
    };

    socket.on(ACTIONS.LEAVE, leaveRoom);

    socket.on('disconnecting', leaveRoom);
});

const PORT = process.env.PORT || 5500;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
//app replace by server
