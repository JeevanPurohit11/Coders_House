import React from 'react'
import styles from './Card.module.css'

// Props is a special keyword in React that stands for properties and is used for passing data from one component to another
//the children props is always their in each component it include all detials inside current component.
const Card  = ({title,icon,children})=>{
  return (
    //this thing is common in all pages so we wrapp inside a card component
    <div className={styles.card}> 
      <div className={styles.headingWrapper}>
              <img src={`/images/${icon}`} alt='logo'/>
              <h1 className={styles.heading}>{title}</h1>
      </div>
         {children}
      </div>
   );
};

export default Card