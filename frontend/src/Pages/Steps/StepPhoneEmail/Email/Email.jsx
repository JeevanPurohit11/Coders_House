import React,{useState} from 'react'
import Card from '../../../../Components/Shared/Card/Card';
import Button from '../../../../Components/Shared/Button/Button';
import TextInput from '../../../../Components/Shared/TextInput/TextInput';
import Styles from '../StepPhoneEmail.module.css';

const Email = ({onNext}) => {

  const [email,setEmail]=useState('');
    return (
      <div >
          <Card title="Enter Your Email Id " icon="email-emoji.png">
            {/* set phone number as we receieve ,we will get number from input and set that number useing setPhoneNumber */}
            <TextInput value={email} onChange={(e)=>setEmail(e.target.value)}/> 
        <div>
          <div className={Styles.actionButtonWrap}>
             <Button  onClick={onNext} text="Next " />
          </div>
          <p className={Styles.buttonParagraph}>
                   By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
          </p>
        </div>
      </Card>
      </div>
      );
}

export default Email