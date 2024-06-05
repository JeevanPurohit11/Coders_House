import React,{useState} from 'react'
import styles from './Authenticate.module.css'
import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail'
import StepOtp from '../Steps/StepOtp/StepOtp'

const steps = {
    1 : StepPhoneEmail,
    2 : StepOtp,
}

const Authenticate = () => {
    let [step,setstep]=useState(1);
    let Step = steps[step];
   
    function onNext(){
       setstep(step+1);
    }
  return (
    <>
    <div>
        <Step onNext={onNext} />
    </div>
    </>
  )
}

export default Authenticate