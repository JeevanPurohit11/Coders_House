import React from 'react';
import styles from './Home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../Components/Shared/Card/Card';
import Button from '../../Components/Shared/Button/Button';

const Home = () => {
  const navigate = useNavigate();

  const signInLinkStyle = {
    color: '#0077FF',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginLeft: '10px',
  };

  const startRegister = () => {
     navigate('/authenticate');
  };

  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to Coders House!" icon="logo.png">
        <p className={styles.text}>
          We’re working hard to get Codershouse ready for everyone! 
          While we wrap up the finishing touches, we’re adding people 
          gradually to make sure nothing breaks.
        </p>
        <div>
          <Button onClick={startRegister} text="Let's Begin " />
        </div>
        <div className={styles.signInWrapper}>
          <span className={styles.hasInvite}>Have an invite text? </span>
          
          {/* <Link style={signInLinkStyle} to="/login">Sign in</Link>    THIS link has been remove to directly user like on let go redirect to authentcate page /email or phone (NO USE) of sign in */ }  
        </div>
      </Card>
    </div>
  );
}

export default Home;
