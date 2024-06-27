import React, { useState } from 'react';
import Home from './Pages/Home/Home';
import Navigation from './Components/Shared/Navigation/Navigation';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Authenticate from './Pages/Authenticate/Authenticate';
import Activate from './Pages/Activate/Activate';
import Rooms from './Pages/Rooms/Rooms'
import Room from './Pages/Room/Room'
import { useSelector } from 'react-redux';
import './App.css'
import {useLoadingWithRefresh} from './hooks/useLoadingWithRefresh';
import Loader from '../src/Components/Shared/Loader/Loader'

// // defined below dynamically
// // const isAuth = false;    //IS user logged in or not 
// // const user={             // IS user has fill actvate detials(like profile picture + full name )
// //    activated : false,
// // }

const GuestRoute = ({ children }) => {
  const {isAuth}= useSelector((state)=>state.auth);  //taking value from local store.
  console.log(isAuth);
 // console.log(user);
 return isAuth ? <Navigate to="/activate" /> : children;
};

const SemiProtectedRoute= ({children})=>{
  const { user,isAuth }= useSelector((state)=>state.auth);
   return !isAuth ? (
      <Navigate to ="/" />
   ) : !user.activated ? (
      children
   ) : (
      <Navigate to ="/rooms" />
   );
}

const ProtectedRoute=({children})=>{
  const {user,isAuth}= useSelector((state)=>state.auth);

  return !isAuth ? ( 
        <Navigate to ="/" />             //user only login
  ) : !user.activated ? (      //user login but not fill details (full name and profile pic.(so navigate to activate page ))
        <Navigate to ="/activate" />
  ) : (
    children                // the things inbetween our Protected component will be display.(i.e ) rooms component 
  )                                   // if children login and activated so directly navigate to rooms page
} 

function App() {

  // call refresh endpoint
  const { loading } = useLoadingWithRefresh();

  return loading ? (
    <Loader message="please wait while refreshing.."/>
  ) : (
      <Router>
        <Navigation />
        {/* For each page we have different routes, and we require navigation in all so we use it above */}
        <Routes>
            <Route path="/" element={
                <GuestRoute>
                  <Home />
                </GuestRoute>
            } />  {/*render home page*/}
            <Route path="/authenticate" element={
                <GuestRoute>
                  <Authenticate />
                </GuestRoute>
            } />  {/*onclick render Authenticate page*/}
            {/* <Route path="/register" element={<Register />} /> 
            <Route path="/login" element={<Login />} />   */}

            <Route path="/activate" element={
                <SemiProtectedRoute>
                  <Activate />
                </SemiProtectedRoute>
            } />

            <Route path="/rooms" element={
              <ProtectedRoute>
                  <Rooms/>
              </ProtectedRoute>
            }/>
            {/* for dynamic allocation we use :id , id chnage in each instance */}
             <Route path="/room/:id" element={
              <ProtectedRoute>
                  <Room/>
              </ProtectedRoute>
            }/>
        </Routes>
      </Router>
   );
}

export default App;

