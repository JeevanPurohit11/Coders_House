import React, { useState } from 'react'
import Styles from './StepName.module.css'
import Card from '../../../Components/Shared/Card/Card'
import Button from '../../../Components/Shared/Button/Button'
import TextInput from '../../../Components/Shared/TextInput/TextInput'
import { useDispatch ,useSelector } from 'react-redux'
import { setName } from '../../../Store/activateSlice'

const StepName = ({onNext}) => {
  const name= useSelector((state)=> state.activate);  // storing local storage name come bak when we goes one step back from avatar page to fullname , we pass default as name , which was initiall be empty
  const dispatch = useDispatch();
  const [fullName , setFullName]= useState(name);
  function nextStep(){
     if(!fullName){
      return;
     }
    dispatch(setName(fullName));      // store inside our redux store
    onNext();
  }
  return (
    <>  
    <div className={Styles.cardWrapper}>
          <Card title="What’s your full name? " icon="goggle-emoji.png">
            {/* set phone number as we receieve ,we will get number from input and set that number useing setPhoneNumber */}
            <TextInput value={fullName} onChange={(e)=>setFullName(e.target.value)}/> 
        
        <p className={Styles.paragraph}>
          People use real names at codershouse :) 
          </p>
            <div>
             <Button onClick={nextStep} text="Next " />
          </div>
        
      </Card>
      </div>
    </>
  );
}

export default StepName