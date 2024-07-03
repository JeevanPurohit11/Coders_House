import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';  // Importing useSelector to access Redux state
import { useParams, useNavigate } from 'react-router-dom';  // Importing useParams and useNavigate for routing
import { getRoom } from '../../http/index'; // Assuming you have an API function for fetching room data
import {useWebRTC} from '../../hooks/useWebRTC' // Custom hook for WebRTC functionality
import styles from './Room.module.css'; // Assuming you're using CSS modules for styling

const Room = () => {
    const user = useSelector((state) => state.auth.user);  // Accessing user data from Redux state
    const { roomId } = useParams();  // Extracting roomId from URL params
    const [room, setRoom] = useState(null);  // State to hold room data
    const { clients, provideRef, handleMute } = useWebRTC(roomId, user);  // Using custom WebRTC hook

    const navigate = useNavigate();  // Using useNavigate for navigation in React Router v6
    const [isMuted, setMuted] = useState(true);  // State to manage mute/unmute functionality

    // Fetch room data from API when roomId changes
    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const { data } = await getRoom(roomId);  // Calling API to fetch room data
                setRoom(data);  // Updating room state with fetched data
            } catch (error) {
                console.error('Error fetching room:', error);  // Logging error if fetch fails
            }
        };

        fetchRoom();  // Triggering fetchRoom function
    }, [roomId]);  // Dependency array ensures useEffect runs when roomId changes

    // Effect to handle muting/unmuting when isMuted or user.id changes
    useEffect(() => {
        handleMute(isMuted, user.id);  // Calling handleMute function from useWebRTC hook
    }, [handleMute, isMuted, user.id]);  // Dependency array ensures useEffect runs on relevant changes

    // Function to navigate to /rooms when leaving the room
    const handleManualLeave = () => {
        navigate('/rooms');  // Navigating to '/rooms' route using navigate function
    };

    // Function to handle mute/unmute button clicks
    const handleMuteClick = (clientId) => {
        if (clientId !== user.id) return;  // Checking if the client ID matches the current user's ID
        setMuted((prevMuted) => !prevMuted);  // Toggling mute state
    };

    // Rendering JSX
    return (
        <div>
            <div className="container">
                {/* Button to navigate back to all voice rooms */}
                <button onClick={handleManualLeave} className={styles.goBack}>
                    <img src="/images/arrow-left.png" alt="arrow-left" />
                    <span>All voice rooms</span>
                </button>
            </div>
            <div className={styles.clientsWrap}>
                <div className={styles.header}>
                    {/* Displaying room topic if room data is available */}
                    {room && <h2 className={styles.topic}>{room.topic}</h2>}
                    <div className={styles.actions}>
                        <button className={styles.actionBtn}>
                            <img src="/images/palm.png" alt="palm-icon" />
                        </button>
                        <button onClick={handleManualLeave} className={styles.actionBtn}>
                            <img src="/images/win.png" alt="win-icon" />
                            <span>Leave quietly</span>
                        </button>
                    </div>
                </div>
                <div className={styles.clientsList}>
                    {/* Mapping through clients array to display each client */}
                    {clients.map((client) => (
                        <div className={styles.client} key={client.id}>
                            <div className={styles.userHead}>
                                <img className={styles.userAvatar} src={client.avatar} alt="" />
                                <audio
                                    autoPlay
                                    ref={(instance) => {
                                        provideRef(instance, client.id);  // Providing audio ref for each client
                                    }}
                                />
                                {/* Button to mute/unmute client's audio */}
                                <button onClick={() => handleMuteClick(client.id)} className={styles.micBtn}>
                                    {client.muted ? (  // Displaying mute/unmute icon based on client's muted state
                                        <img className={styles.mic} src="/images/mic-mute.png" alt="mic" />
                                    ) : (
                                        <img className={styles.micImg} src="/images/mic.png" alt="mic" />
                                    )}
                                </button>
                            </div>
                            <h4>{client.name}</h4>  {/* Displaying client's name */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Room;
