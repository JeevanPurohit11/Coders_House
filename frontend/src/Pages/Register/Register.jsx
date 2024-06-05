//we are not using this component as we created activte and authenticate.
import React, { useState } from 'react'
import styles from './Register.module.css'
import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail'
import StepAvatar from '../Steps/StepAvatar/StepAvatar'
import StepName from '../Steps/StepName/StepName'
import StepOtp from '../Steps/StepOtp/StepOtp'
import StepUsername from '../Steps/StepUsername/StepUsername'

//mapping 
const steps = {
    1 : StepPhoneEmail,
    2 : StepOtp,
    3 : StepName,
    4 : StepAvatar,
    5 : StepUsername,
}



const Register = () => {
    //useState is a React Hook that lets you add a state variable to your component. const [state, setState] = useState(initialState) useState(initialState) set functions, like setSomething(nextState)
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

export default Register