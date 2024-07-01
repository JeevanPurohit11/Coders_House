import { useCallback, useEffect, useRef, useState } from "react";
import { useStateWithCallBack } from "./useStateWithCallBack";
import {socketInit} from '../Pages/socket/index'
import ACTIONS from "../actions";

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

    const addNewClients = useCallback((newClient, cb) => {
        const lookingFor = clients.find((client) => client.id === newClient.id);
        if (lookingFor === undefined) {
            setClients((existingClients) => [...existingClients, newClient], cb);
        }
    }, [clients, setClients]);

    useEffect(()=>{
         socket.current=socketInit();
    },[])
    // Capture audio
    useEffect(() => {
        const startCapture = async () => {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
        };

        if (user && user.id) {
            startCapture().then(() => {
                addNewClients(user, () => {
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
    }, [user, addNewClients]);

    return { clients, provideRef };
};
