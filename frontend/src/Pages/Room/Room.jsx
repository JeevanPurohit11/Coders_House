import React from 'react'
import Styles from './Room.module.css'
import { useWebRTC } from '../../hooks/useWebRTC';

const Room = () => {
  const {client}=useWebRTC();
  return (
    <div>
      <h1>All Connected CLients</h1>
      {clients.map((client)=>{
        return (
           <div key={client.id}>
               <audio controls autoPlay></audio>
               <h4>client.name</h4>
            </div>
        )
      })}
    </div>
  );
};

export default Room