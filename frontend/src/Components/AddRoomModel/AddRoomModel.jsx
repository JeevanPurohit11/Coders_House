import React from 'react';
import Styles from './AddRoomModel.module.css';
import TextInput from '../Shared/TextInput/TextInput';

const AddRoomModel = () => {
  return (
    <div className={Styles.modalMask}>
      <div className={Styles.modalBody}>
        <div className={Styles.modalHeader}>
          <h3 className={Styles.heading}>Enter the topic to be discussed.</h3>
          <TextInput fullwidth="true" />
          <h2 className={Styles.subHeading}>Room Types</h2>
          <div className={Styles.roomTypes}>
            <div className={Styles.typeBox}>
              <img src="/images/globe.png" alt="globe" />
              <span>Open</span>
            </div>
            <div className={Styles.typeBox}>
              <img src="/images/social.png" alt="social" />
              <span>Social</span>
            </div>
            <div className={Styles.typeBox}>
              <img src="/images/lock.png" alt="lock" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={Styles.modalFooter}>
          <h2 className={Styles.footerHeading}>Start a room, open to everyone.</h2>
          <button className={Styles.footerButton}>
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