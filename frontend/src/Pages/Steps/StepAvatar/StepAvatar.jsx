import React, { useState,useEffect } from 'react'
import Styles from './StepAvatar.module.css'
import Button from '../../../Components/Shared/Button/Button';
import Card from '../../../Components/Shared/Card/Card';
import { useSelector , useDispatch } from 'react-redux';  //help to fetch data from store.(local)
import { setAvatar } from '../../../Store/activateSlice';
import { setAuth } from '../../../Store/authSlice';
import {activate} from '../../../http'
import Loader from '../../../Components/Shared/Loader/Loader';

const StepAvatar = ({onNext}) => {
  const dispatch= useDispatch();
  const {name, avatar} =useSelector((state)=>state.activate);
  const [image,setImage]=useState('/images/monkey-avatar.png');
  const [loading ,setLoading] =useState(false);
 // const [unMounted, setUnMounted]=useState(false);


 async function submit(){
  // if any person not upload photo then not redirect to next page
  if(!name || !avatar) return;
     setLoading(true);
      try{
          const {data}= await activate({name , avatar});
          if(data.auth){
          //   if(unMounted){
              dispatch(setAuth(data));
           // }
           
          }
       }catch(err){
           console.log(err);
       }finally{
          setLoading(false);  // in either case it success of fail we have to stop loading .
       }
     //  onNext();
  }
  //file is array type element and [0] is name of our file which was upload by us
  function captureImage(e){
      const file=e.target.files[0];
      const reader= new FileReader();    //file reader api
      reader.readAsDataURL(file);    //read file of image it take time , so we use waiting for let it load first = onloadend then work below function
      reader.onloadend= function(){
       //    console.log(reader.result); // our photo in string base 64 format 
           setImage(reader.result);   // store in local
           dispatch(setAvatar(reader.result));

      }
     // console.log(e);
  }
  //dynamically taking the name of user
  
  //bug resolved
  // useEffect(()=>{
  //    return ()=>{
  //        setUnMounted(true);
  //    };
  // },[]);

  if(loading) return <Loader message="Activation in progess..."/>
  return (
    <>
    <Card title={`Okay , ${name}`} icon="monkey-emoji.png">   
    <p className={Styles.subHeading}>How's this Photo ? </p>

    <div className={Styles.avatarWrapper}>
        <img className={Styles.avatarImage} src={image} alt="avatar" />
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