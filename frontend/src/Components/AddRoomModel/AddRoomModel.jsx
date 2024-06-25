import React,{useState} from 'react';
import Styles from './AddRoomModel.module.css';
import TextInput from '../Shared/TextInput/TextInput';
import {createRoom as create} from '../../http/index'

const AddRoomModel = ({onClose}) => {
  const [roomType, setRoomType] = useState('open');  //room type
  const [topic , setTopic]=useState('');            //room topic

 async function createRoom(){
     if(!topic) return;
     try{
        const {data} = await create({topic,roomType});
        console.log(data);

     }catch(err){
         console.log(err.message);
     }
  }
  return (
    <div className={Styles.modalMask}>
      <div className={Styles.modalBody}>
        <button onClick={onClose}className={Styles.closeButton}>
          <img src="/images/close.png" alt="closeButton" />
        </button>
        <div className={Styles.modalHeader}>
          <h3 className={Styles.heading}>Enter the topic to be discussed.</h3>
          <TextInput fullwidth="true" value={topic} onChange={(e)=>setTopic(e.target.value)}/>
          <h2 className={Styles.subHeading}>Room Types</h2>
          <div className={Styles.roomTypes}>
            <div onClick={()=> setRoomType('open')}className={`${Styles.typeBox} ${
                                roomType === 'open' ? Styles.active : ''
                            }`}>
              <img src="/images/globe.png" alt="globe" />
              <span>Open</span>
            </div>
            <div onClick={()=> setRoomType('social')} className={`${Styles.typeBox} ${
                                roomType === 'social' ? Styles.active : ''
                            }`}>
              <img src="/images/social.png" alt="social" />
              <span>Social</span>
            </div>
            <div onClick={()=> setRoomType('private')} className={`${Styles.typeBox} ${
                                roomType === 'social' ? Styles.active : ''
                            }`}>
              <img src="/images/lock.png" alt="lock" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={Styles.modalFooter}>
          <h2 className={Styles.footerHeading}>Start a room, open to everyone.</h2>
          <button onClick={createRoom}className={Styles.footerButton}>
            <img src="/images/celebration.png" alt="celebration" />
            Let's Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModel;

//8th ->30