import React from 'react'
import { Link } from 'react-router-dom' //will clicking on normal ankor tag link,pages will be refresh.
//whle using link we get link ,without refreshing the page.(link tag open one ankor tag and wrap all inside.) 
import styles from "./Navigation.module.css";

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
  return (
    //multiple class using for single tag.
       <nav className={`${styles.navbar} container`}>   
        <Link style={brandStyle} to="/">   
           <img src="/images/logo.png" alt="logo"/>
           <span style ={logoText}>Coders House</span>
        </Link>
      </nav>
  );
}
export default Navigation
