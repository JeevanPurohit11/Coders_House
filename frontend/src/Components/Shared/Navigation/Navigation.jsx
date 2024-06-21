import React from 'react'
import { Link } from 'react-router-dom' //will clicking on normal ankor tag link,pages will be refresh.
//whle using link we get link ,without refreshing the page.(link tag open one ankor tag and wrap all inside.) 
import styles from "./Navigation.module.css";
import { useDispatch, useSelector } from 'react-redux';
import {logout} from  '../../../http';
import {setAuth} from '../../../Store/authSlice'; 

 const Navigation = () => {
  //we have to right here style for child component ,same like inline css
  const brandStyle={
    color : '#fff',
    textDecoration : 'none',
    fontWeight : 'bold',
    fontSize : '22px',
    display : 'flex',
    alignItems: 'center',

  }; 
  const logoText = {
    marginLeft : '10px',
  };

  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);   //taking data from store
  async function logoutUser() {
      try {
          const { data } = await logout();     //auth controller, pass from middleware
          dispatch(setAuth(data));
      } catch (err) {
          console.log(err);
      }
  }
//we use conditional rendering i.e if isAuth true then only our button will be seen (used short circuit like ternary operator), beacuse when we logout , the logout button should be disappier
  return (
    //multiple class using for single tag.
       <nav className={`${styles.navbar} container`}>   
        <Link style={brandStyle} to="/">   
           <img src="/images/logo.png" alt="logo"/>
           <span style ={logoText}>Coders House</span>
        </Link>
        {isAuth && <button onClick={logoutUser}>Logout</button>}
      </nav>
  );
}
export default Navigation
