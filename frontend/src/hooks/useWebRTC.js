import { useCallback, useEffect, useRef, useState } from "react";
import { useStateWithCallback } from "./useStateWithCallBack";// Custom hook for state with callback
import socketInit from '../Pages/socket/index'  // Importing socket initialization function
import { ACTIONS } from "../actions";
import freeice from 'freeice';// Importing ICE servers configuration


// const users = [
//     {
//         id: 1,
//         name: 'Rakesh Rajpurohit',
//     },
//     {
//         id: 2,
//         name: 'Bhavesh Rajpurohit',
//     },
// ];

export const useWebRTC = (roomId, user) => {
    // we have to create a custom hook useStateWithCallBack, because here useEffect will not work,
    // and we need inside callback to work after this useState client is updated.
    // our below useState will replace with useStateWithCallback.
        const [clients, setClients] = useStateWithCallback([]);  // State for clients with callback support
        const audioElements = useRef({});  // Ref for audio elements
        const connections = useRef({});  // Ref for RTC peer connections
        const socket = useRef(null);  // Ref for socket instance
        const localMediaStream = useRef(null);  // Ref for local media stream
        const clientsRef = useRef(null);  // Ref for clients data
    
        // Callback function to add a new client to the clients state
        const addNewClient = useCallback(
            (newClient, cb) => {
                // Check if the client already exists in the clients state
                const lookingFor = clients.find(
                    (client) => client.id === newClient.id
                );
    
                // Add the new client only if it doesn't exist already
                if (lookingFor === undefined) {
                    setClients(
                        (existingClients) => [...existingClients, newClient],
                        cb
                    );
                }
            },
            [clients, setClients]
        );
    
        // Effect to sync clientsRef with clients state
        useEffect(() => {
            clientsRef.current = clients;
        }, [clients]);
    
        // Effect to initialize chat when component mounts
        useEffect(() => {
            const initChat = async () => {
                // Initialize socket connection
                socket.current = socketInit();
    
                // Capture local media stream (audio)
                await captureMedia();
    
                // Add the current user as a client with muted state
                addNewClient({ ...user, muted: true }, () => {
                    const localElement = audioElements.current[user.id];
                    if (localElement) {
                        localElement.volume = 0;
                        localElement.srcObject = localMediaStream.current;
                    }
                });
    
                // Socket event listeners for various actions
                socket.current.on(ACTIONS.MUTE_INFO, ({ userId, isMute }) => {
                    handleSetMute(isMute, userId);
                });
                socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);
                socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
                socket.current.on(ACTIONS.ICE_CANDIDATE, handleIceCandidate);
                socket.current.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);
                socket.current.on(ACTIONS.MUTE, ({ peerId, userId }) => {
                    handleSetMute(true, userId);
                });
                socket.current.on(ACTIONS.UNMUTE, ({ peerId, userId }) => {
                    handleSetMute(false, userId);
                });
    
                // Emit JOIN event to server with roomId and user details
                socket.current.emit(ACTIONS.JOIN, {
                    roomId,
                    user,
                });
    
                // Function to capture local media (audio stream)
                async function captureMedia() {
                    localMediaStream.current =
                        await navigator.mediaDevices.getUserMedia({
                            audio: true,
                        });
                }
    
                // Function to handle a new peer connection
                async function handleNewPeer({
                    peerId,
                    createOffer,
                    user: remoteUser,
                }) {
                    if (peerId in connections.current) {
                        return console.warn(
                            `You are already connected with ${peerId} (${user.name})`
                        );
                    }
    
                    // Create new RTC peer connection and configure ICE servers
                    connections.current[peerId] = new RTCPeerConnection({
                        iceServers: freeice(),
                    });
    
                    // Handle ICE candidate events on this peer connection
                    connections.current[peerId].onicecandidate = (event) => {
                        socket.current.emit(ACTIONS.RELAY_ICE, {
                            peerId,
                            icecandidate: event.candidate,
                        });
                    };
    
                    // Handle on track events on this peer connection
                    connections.current[peerId].ontrack = ({
                        streams: [remoteStream],
                    }) => {
                        addNewClient({ ...remoteUser, muted: true }, () => {
                            // Get current user's mute info
                            const currentUser = clientsRef.current.find(
                                (client) => client.id === user.id
                            );
                            if (currentUser) {
                                // Emit mute info to server
                                socket.current.emit(ACTIONS.MUTE_INFO, {
                                    userId: user.id,
                                    roomId,
                                    isMute: currentUser.muted,
                                });
                            }
    
                            // Set remote stream to audio element
                            if (audioElements.current[remoteUser.id]) {
                                audioElements.current[remoteUser.id].srcObject =
                                    remoteStream;
                            } else {
                                let settled = false;
                                const interval = setInterval(() => {
                                    if (audioElements.current[remoteUser.id]) {
                                        audioElements.current[
                                            remoteUser.id
                                        ].srcObject = remoteStream;
                                        settled = true;
                                    }
    
                                    if (settled) {
                                        clearInterval(interval);
                                    }
                                }, 300);
                            }
                        });
                    };
    
                    // Add local media tracks to the peer connection  
                    // // Null check before accessing localMediaStream.current.getTracks()
                    if (localMediaStream.current) {
                        localMediaStream.current.getTracks().forEach((track) => {
                            connections.current[peerId].addTrack(
                                track,
                                localMediaStream.current
                            );
                        });
                    }
                    // Create an offer if required
                    if (createOffer) {
                        const offer = await connections.current[
                            peerId
                        ].createOffer();
    
                        // Set local description and send offer to server
                        await connections.current[peerId].setLocalDescription(
                            offer
                        );
                        socket.current.emit(ACTIONS.RELAY_SDP, {
                            peerId,
                            sessionDescription: offer,
                        });
                    }
                }
    
                // Function to handle removal of a peer connection
                async function handleRemovePeer({ peerId, userId }) {
                    if (connections.current[peerId]) {
                        connections.current[peerId].close();
                    }
    
                    // Remove peer connection and associated audio element
                    delete connections.current[peerId];
                    delete audioElements.current[peerId];
    
                    // Update clients state to remove the disconnected client
                    setClients((list) => list.filter((c) => c.id !== userId));
                }
    
                // Function to handle ICE candidate events
                async function handleIceCandidate({ peerId, icecandidate }) {
                    if (icecandidate) {
                        connections.current[peerId].addIceCandidate(icecandidate);
                    }
                }
    
                // Function to set remote media description
                async function setRemoteMedia({
                    peerId,
                    sessionDescription: remoteSessionDescription,
                }) {
                    connections.current[peerId].setRemoteDescription(
                        new RTCSessionDescription(remoteSessionDescription)
                    );
    
                    // If session description is offer, create an answer
                    if (remoteSessionDescription.type === 'offer') {
                        const connection = connections.current[peerId];
                        const answer = await connection.createAnswer();
                        connection.setLocalDescription(answer);
    
                        // Send answer to server
                        socket.current.emit(ACTIONS.RELAY_SDP, {
                            peerId,
                            sessionDescription: answer,
                        });
                    }
                }
    
                // Function to handle mute state changes
                async function handleSetMute(mute, userId) {
                    // Find index of client in clientsRef
                    const clientIdx = clientsRef.current
                        .map((client) => client.id)
                        .indexOf(userId);
    
                    // Create a copy of clientsRef for modification (hack for copy)
                    const allConnectedClients = JSON.parse(
                        JSON.stringify(clientsRef.current)
                    );
    
                    // Update mute state of the client if found
                    if (clientIdx > -1) {
                        allConnectedClients[clientIdx].muted = mute;
                        setClients(allConnectedClients);
                    }
                }
            };
    
            // Initialize chat
            initChat();
    
            // Cleanup function when component unmounts
            return () => {
                // Stop all local media tracks
                if (localMediaStream.current) {
                    localMediaStream.current.getTracks().forEach((track) => track.stop());
                }
    
                // Emit LEAVE event to server with roomId
                if (socket.current) {
                socket.current.emit(ACTIONS.LEAVE, { roomId });
    
                // Close all peer connections and delete associated elements
                for (let peerId in connections.current) {
                    connections.current[peerId].close();
                    delete connections.current[peerId];
                    delete audioElements.current[peerId];
                }
    
                // Remove all socket event listeners
                socket.current.off(ACTIONS.ADD_PEER);
                socket.current.off(ACTIONS.REMOVE_PEER);
                socket.current.off(ACTIONS.ICE_CANDIDATE);
                socket.current.off(ACTIONS.SESSION_DESCRIPTION);
                socket.current.off(ACTIONS.MUTE);
                socket.current.off(ACTIONS.UNMUTE);
            }
            };
        }, []);
    
        // Function to provide audio element ref for a specific user
        const provideRef = (instance, userId) => {
            audioElements.current[userId] = instance;
        };
    
        // Function to handle mute/unmute
        const handleMute = (isMute, userId) => {
            let settled = false;
    
            // Toggle local media stream based on mute state
            if (userId === user.id) {
                let interval = setInterval(() => {
                    if (localMediaStream.current) {
                        localMediaStream.current.getTracks()[0].enabled = !isMute;
                        if (isMute) {
                            // Emit MUTE event to server
                            socket.current.emit(ACTIONS.MUTE, {
                                roomId,
                                userId: user.id,
                            });
                        } else {
                            // Emit UNMUTE event to server
                            socket.current.emit(ACTIONS.UNMUTE, {
                                roomId,
                                userId: user.id,
                            });
                        }
                        settled = true;
                    }
                    if (settled) {
                        clearInterval(interval);
                    }
                }, 200);
            }
        };
    
        // Return clients state, provideRef function, and handleMute function
        return {
            clients,
            provideRef,
            handleMute,
        };
};
    