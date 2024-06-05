import './App.css';
import Home from './Pages/Home/Home';
import Navigation from './Components/Shared/Navigation/Navigation';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// import Register from './Pages/Register/Register';
// import Login from './Pages/Login/Login';
import Authenticate from './Pages/Authenticate/Authenticate';
import Activate from './Pages/Activate/Activate';
import Rooms from './Pages/Rooms/Rooms'

const isAuth = false;    //IS user logged in or not 
const user={             // IS user has fill actvate detials(like profile picture + full name )
   activated : false,
}

function App() {
   return (
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
   );
}

const GuestRoute = ({ children }) => {
  return isAuth ? (
    <Navigate to="/rooms" />
  ) : (
    children
  );
};

const SemiProtectedRoute= ({children})=>{
   return isAuth ? (
      <Navigate to ="/" />
   ) : isAuth && !user.activated ? (
      children
   ) : (
      <Navigate to ="/rooms" />
   )
}

const ProtectedRoute=()=>{
  return !isAuth ? ( 
        <Navigate to ="/" />             //user only login
  ) : isAuth && !user.activated ? (      //user login but not fill details (full name and profile pic.(so navigate to activate page ))
        <Navigate to ="/activate" />
  ) : (
    children                // the things inbetween our Protected component will be display.(i.e ) rooms component 
  )                                   // if children login and activated so directly navigate to rooms page
} 

export default App;
