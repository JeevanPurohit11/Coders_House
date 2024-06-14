// //we are not using this component as we created activte and authenticate.
// import React,{useState} from 'react'
// import styles from './Login.module.css'
// import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail'
// import StepOtp from '../Steps/StepOtp/StepOtp'

// const steps = {
//     1 : StepPhoneEmail,
//     2 : StepOtp,
// }

// const Login = () => {
//     let [step,setstep]=useState(1);
//     let Step = steps[step];
   
//     function onNext(){
//        setstep(step+1);
//     }
//   return (
//     <>
//     <div>
//         <Step onNext={onNext} />
//     </div>
//     </>
//   )
// }

// export default Login