import React, { useState } from 'react'
import Button from '../../../Components/Shared/Button/Button';
import Phone from './Phone/Phone';
import Email from './Email/Email';
import Styles from './StepPhoneEmail.module.css'

const PhoneEmailMap={
   phone : Phone,
   email : Email,
}
//here onNext coes from authenticate component parent of this compoenent ,we call this a prop drilling (we can use context API to remove prop drilling)
const StepPhoneEmail = ({onNext}) => {
   
  const [type, setType]=useState('phone');
   const Component= PhoneEmailMap[type];
  
   return ( 
    <>
       <div className={Styles.cardWrapper}>
        <div>
            <div className={Styles.buttonWrapper}>
                
            <button className={`${Styles.tabButton} ${type==='phone' ? Styles.active : ''}`}  //added the background of button as blue color if user clickk on =phone  icon
              onClick={()=>setType('phone')}>    {/* Button type(press phone icon) =phone navigate to phone page */ }
                 <img src='/images/phone-white.png' alt='phone' />
            </button>

            <button className={`${Styles.tabButton} ${type==='email' ? Styles.active : ''}`}    ////added the background of button as blue color if user clickk on =email icon
             onClick={()=>setType('email')}>          {/* Button type (press email icon)=phone navigate to email page */ }
                  <img src='/images/mail-white.png' alt='email' />
            </button>
            
            </div>
            <Component onNext={onNext} />
         </div>  
       </div>
    </>
   )
}

export default StepPhoneEmail;