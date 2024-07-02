import { useCallback, useEffect, useRef, useState } from "react";
import { useStateWithCallBack } from "./useStateWithCallBack";
import {socketInit} from '../Pages/socket/index'
import { ACTIONS } from "../actions";
import freeice from 'freeice';


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
    const [clients, setClients] = useStateWithCallBack([]);
    const audioElements = useRef({});
    const connections = useRef({});
    const localMediaStream = useRef(null);
    const socket=useRef();

    const provideRef = (instance, userId) => {
        audioElements.current[userId] = instance;
    };

    const addNewClient = useCallback((newClient, cb) => {
        const lookingFor = clients.find((client) => client.id === newClient.id);
        if (lookingFor === undefined) {
            setClients((existingClients) => [...existingClients, newClient], cb);
        }
    }, [clients, setClients]);

    useEffect(()=>{
          const handleNewPeer=async({roomId,createOffer, user:remoteUser})=>{
                   //if already connected then give warning
                   if(peerId in connections.current){
                         return console.warn(`you are already connected with id ${peerId} (${user.name})`);
                   }
                   connections.current[peerId]=new RTCPeerConnection({
                      iceServers : freeice(),  //connection created.
                   })
                   //handle all new ice candidate
                   connections.current[peerId].onicecandidate=(event)=>{
                    socket.current.emit(ACTIONS.RELAY_ICE,{
                        peerId,
                        icecandidate : event.candidate
                    })
                   }
                   //handle ontrack on this connection
                   connections.current[peerId].ontrack = ({
                    streams: [remoteStream],
                }) => {
                    addNewClient({ ...remoteUser, muted: true }, () => {
                        // get current users mute info
                        const currentUser = clientsRef.current.find(
                            (client) => client.id === user.id
                        );
                        if (currentUser) {
                            socket.current.emit(ACTIONS.MUTE_INFO, {
                                userId: user.id,
                                roomId,
                                isMute: currentUser.muted,
                            });
                        }
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
                  // Add connection to peer connections track
                  localMediaStream.current.getTracks().forEach((track) => {
                    connections.current[peerId].addTrack(
                        track,
                        localMediaStream.current
                    );
                });

                // Create an offer if required
                if (createOffer) {
                    const offer = await connections.current[
                        peerId
                    ].createOffer();

                    // Set as local description
                    await connections.current[peerId].setLocalDescription(
                        offer
                    );

                    // send offer to the server
                    socket.current.emit(ACTIONS.RELAY_SDP, {
                        peerId,
                        sessionDescription: offer,
                    });
                }
            }


          }
         socket.current.on(ACTIONS.ADD_PEER,handleNewPeer)
         socket.current=socketInit()
    },[]);
    // Capture audio
    useEffect(() => {
        const startCapture = async () => {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
        };

        if (user && user.id) {
            startCapture().then(() => {
                addNewClient(user, () => {
                    const localElement = audioElements.current[user.id];
                    if (localElement) {
                        localElement.volume = 0;  //if we comment this then we can able to listen sound
                        localElement.srcObject = localMediaStream.current;
                    }
                      //socket emit JOIN socket io
                      socket.current.emit(ACTIONS.JOIN,{roomId,user});
                });
            });
        } else {
            console.error("User is undefined or does not have an id");
        }
    }, [user, addNewClient]);

    return { clients, provideRef };
};
