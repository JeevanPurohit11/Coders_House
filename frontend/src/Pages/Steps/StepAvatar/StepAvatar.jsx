import React, { useState } from 'react'
import Styles from './StepAvatar.module.css'
import Button from '../../../Components/Shared/Button/Button';
import Card from '../../../Components/Shared/Card/Card';
import { useSelector , useDispatch } from 'react-redux';  //help to fetch data from store.(local)
import { setAvatar } from '../../../Store/activateSlice';

const StepAvatar = ({onNext}) => {
  const {name} =useSelector((state)=>state.activate);
  const [image,setImage]=useState('../../../../public/images/monkey-avatar.png');

 async function submit(){
       try{
          const {data}= await activate({name , avatar});
          console.log(data);
       }catch(err){
           console.log(err);
       }
  }
  function captureImage(){
      const file=e.target.file[0];
      const reader= new FileReader();
      reader.readAsDataURL(file);    //read file of image it take time , so we use onloadend then work below function
      reader.onloadend= function(){
           console.log(reader.result);
           setImage(reader.result);   // store in local
           dispatch(setAvatar(reader.result));

      }
      console.log(e);
  }
  //dynamically taking the name of user 
  return (
    <>
    <Card title={`Okay , ${name}`} icon="monkey-emoji.png">   
    <p className={Styles.subHeading}>How's this Photo ? </p>

    <div className={Styles.avatarWrapper}>
        <img className={Styles.avatarImage} src="image" alt="avatar" />
    </div>
    {/* connecting input and label our label with hide input , we not have to so input only have to show label , will clicking on label indirectly we redirect to input only it will be at back to label(label hide input ) */}
    <div>
         <input onChange={captureImage} id="avatarInput" type="file" className={Styles.avatarInput}/>
         <label className={Styles.avatarLabel} htmlFor="avatarInput">
          choose a different photo
         </label>
    </div>
    <div >
       <Button onClick={submit} text="Next " />
    </div>
</Card>
</>
  );
};

export default StepAvatar