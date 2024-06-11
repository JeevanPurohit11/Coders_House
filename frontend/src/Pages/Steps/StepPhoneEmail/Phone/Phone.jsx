import React ,{useState} from 'react'
import Card from '../../../../Components/Shared/Card/Card';
import Button from '../../../../Components/Shared/Button/Button';
import TextInput from '../../../../Components/Shared/TextInput/TextInput';
import Styles from '../StepPhoneEmail.module.css';
import { sendOtp } from '../../../../Components/Shared/http/index';   //{} beacuse not default export 
import { useDispatch } from 'react-redux'; //hook
import { setOtp } from '../../../../Store/authSlice';



//onNext is a function which we can call from our parent component which is this case is StepPhoneEmail.jsx
const Phone = ({onNext}) => {

  const [phoneNumber,setPhoneNumber]=useState('');
   async function submit(){                          //bacially api call return promise
        const {data}= await sendOtp({ phone : phoneNumber});
        console.log(data);
        dispatch(setOtp ({phone : data.phone,hash : data.hash}));
        //onNext();
    }
    return (
        <div >
          <Card title="Enter Your Phone Number " icon="phone.png">
            {/* set phone number as we receieve ,we will get number from input and set that number useing setPhoneNumber */}
            <TextInput value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/> 
        <div>
          <div className={Styles.actionButtonWrap}>
             <Button  onClick={submit} text="Next " />   
          </div>
          <p className={Styles.buttonParagraph}>
                   By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
          </p>
        </div>
      </Card>
          
        </div>
      );
}

export default Phone