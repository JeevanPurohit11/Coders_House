import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // hook
import Card from '../../../../Components/Shared/Card/Card';
import Button from '../../../../Components/Shared/Button/Button';
import TextInput from '../../../../Components/Shared/TextInput/TextInput';
import Styles from '../StepPhoneEmail.module.css';
import { sendOtp } from '../../../../http'; // {} because not default export
import { setOtp } from '../../../../Store/authSlice';

const Phone = ({ onNext }) => {
   const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();

    async function submit() {
      //  if (!phoneNumber) return;
      try {
        const { data } = await sendOtp({ phone: phoneNumber });
        console.log(data);
        dispatch(setOtp({ phone: data.phone, hash: data.hash }));
        onNext();
      } catch (error) {
        console.error('Error sending OTP:', error);
      }
    }
  return (
    <div>
      <Card title="Enter Your Phone Number " icon="phone.png">
        <TextInput value={phoneNumber} onChange={(e)  => {console.log(e); setPhoneNumber(e.target.value)}} />
         
        <div>
          <div className={Styles.actionButtonWrap}>
            <Button onClick={submit} text="Next " />
          </div>
          <p className={Styles.buttonParagraph}>
            By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Phone;
