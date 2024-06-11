import React, { useState } from 'react'
import Styles from './StepOtp.module.css'
import Card from '../../../Components/Shared/Card/Card';
import TextInput from '../../../Components/Shared/TextInput/TextInput';
import Button from '../../../Components/Shared/Button/Button';
import { verifyOtp } from '../../../Components/Shared/http';
import { useSelector } from 'react-redux';  // hook to obtain data from local state

const StepOtp = ({onNext}) => {
  const [otp,setOtp] = useState('');
  const {phone,hash}= useSelector((state)=> state.auth.otp);
async function submit(){
    try{
      const {data} = await verifyOtp(otp,phone,hash);
      console.log(data);
    }catch(err){
      console.log(err);
    }
 }
  
  return (
    <>
      <div className={Styles.cardWrapper} >
          <Card title="Enter the code we just texted you " icon="lock-emoji.png">
            {/* set phone number as we receieve ,we will get number from input and set that number useing setPhoneNumber */}
            <TextInput value={otp} onChange={(e)=>setOtp(e.target.value)}/> 
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
    </>
  );
}

export default StepOtp