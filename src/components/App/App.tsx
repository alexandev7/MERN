import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import Dashboard from '../Dashboard/Dashboard'
import DashboardDetails from "../DashboardDetails/DashboardDetails";
import {defaultUser, defaultUserRegistration, UserRegistration} from '../../loginContext'
import FileUpload from '../FileUpload/FileUpload'
import { getCookieValue } from "../../helpers/Utils";
import Home from '../Home/Home'
import ImageDetails from "../ImageDetails/ImageDetails";
import Login from '../Login/Login'
import { LoginContext } from '../../loginContext';
import MyPictures from '../MyPictures/MyPictures'
import Profile from '../Profile/Profile'
import Register from '../Register/Register'
import users from '../../Assets/Data/users';

import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loggedInUser, setLoggedInUser] = React.useState(defaultUser);
  const [userBeingRegistered, setUserBeingRegistered] = React.useState<UserRegistration>(defaultUserRegistration);
  const [userImage, setUserImage] = React.useState<string>("");
  
  if (localStorage.getItem("users") === null){
    localStorage.setItem("users", JSON.stringify(users));
  }

  React.useEffect(()=>{
    const getImageUrl = async () => {
      const response = await axios.get(`http://localhost:4001/api/user/imageURI`, {
        headers: {
          'x-token': getCookieValue("JWT")
        }
      }
      );
      setUserImage(response.data.profileImage);
    }
    getImageUrl();
  })

  return (
    <LoginContext.Provider value={{ loggedIn, loggedInUser, userBeingRegistered, setLoggedIn, setLoggedInUser, setUserBeingRegistered }}>
      <Router>
        <div className="App"> 
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNav">
            {loggedIn ?
            
              <ul className="navbar-nav mr-auto">
                <li className="profile-icon">
                  <img className="profile-image-icon" src={userImage}/>
                </li>
                <li className="nav-item">
                  <NavLink to="/profile" activeStyle={{ fontWeight: "bold" }}>
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/" activeStyle={{ fontWeight: "bold" }}>Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/dashboard" activeStyle={{ fontWeight: "bold" }}>Dashboard</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/myPictures" activeStyle={{ fontWeight: "bold" }}>My Pictures</NavLink>
                </li>
              </ul>
              :
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink exact to="/" activeStyle={{ fontWeight: "bold" }}>Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" activeStyle={{ fontWeight: "bold" }}>Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" activeStyle={{ fontWeight: "bold" }}>Register</NavLink>
                </li>
              </ul>
            }
            </div>
          </nav>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/myPictures">
              <MyPictures />
            </Route>
            <Route path="/imageDetails/:imageId">
              <ImageDetails />
            </Route>
            <Route path="/fileUpload">
              <FileUpload />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/details/:id" > 
              <DashboardDetails />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </LoginContext.Provider>
  );
}

export default App;