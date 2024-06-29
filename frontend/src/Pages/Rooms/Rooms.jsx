import React, { useEffect, useState } from "react";
import styles from "./Rooms.module.css";
import RoomCard from "../../Components/RoomCard/RoomCard";
import AddRoomModel from "../../Components/AddRoomModel/AddRoomModel";
 import {getAllRooms } from "../../http";

//dummy data for testing the room component, 

// const rooms = [
//     {
//         id: 1,
//         topic: 'Which framework best for frontend ?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/monkey-avatar.png',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/monkey-avatar.png',
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 3,
//         topic: 'What’s new in machine learning?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/monkey-avatar.png',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/monkey-avatar.png',
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 4,
//         topic: 'Why people use stack overflow?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/monkey-avatar.png',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/monkey-avatar.png',
//             },
//         ],
//         totalPeople: 40,
//     },
//     {
//         id: 5,
//         topic: 'Artificial inteligence is the future?',
//         speakers: [
//             {
//                 id: 1,
//                 name: 'John Doe',
//                 avatar: '/images/monkey-avatar.png',
//             },
//             {
//                 id: 2,
//                 name: 'Jane Doe',
//                 avatar: '/images/monkey-avatar.png',
//             },
//         ],
//         totalPeople: 40,
//     },
// ];
const Rooms = () => {
  const [showModel,setShowModel]=useState(false);
  const [rooms,setRooms]=useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await getAllRooms();
        console.log("Fetched rooms data:", data);
        if (Array.isArray(data)) {
          setRooms(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);
  

  function openModel(){
        setShowModel(true);
  }
    return (
    <>

      <div className="container">
        <div className={styles.roomsHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All voice rooms</span>
            <div className={styles.searchBox}>
              <img src="/images/search-icon.png" alt="search" />
              <input type="text" className={styles.searchInput} />
            </div>
          </div>
          <div className={styles.right}>
               <button  onClick={openModel} className={styles.startRoomButton}>
                 <img src="/images/add-room-icon.png" alt="room-icon" />
                 <span> start a room </span>
               </button>
          </div>
        </div> 
         {/* for each room component rendering */}
        <div className={styles.roomList}>
                    {rooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
      </div>
      {showModel && <AddRoomModel onClose={()=> setShowModel(false)}/>}
    </>
  );
};

export default Rooms;
