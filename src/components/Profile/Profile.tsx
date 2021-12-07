import React from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';

import { getCookieValue } from "../../helpers/Utils";
import LikedImageList from "../LikedImageList/LikedImageList";
import Title from '../Title/Title';
import { useLogin } from '../../loginContext';

import './Profile.css';

const Profile = () => {

  const { loggedInUser, loggedIn } = useLogin();
  const [ imageURI, setImageURI ] = React.useState<string>("");

  React.useEffect(() =>{

    const getImageUrl = async () => {
      const response = await axios.get(`http://localhost:4001/api/user/imageURI`, {
        headers: {
          'x-token': getCookieValue("JWT")
        }
      }
      );
      setImageURI(response.data.profileImage);
    }

    getImageUrl();

  }, [])

  if (loggedIn) {
    return (
      <div>
        <Title titleString='My Profile' />
        <div className="profileItems" >
          <img className="profile-image" src={imageURI} />
          <div className="itemLine-name"> <b>{loggedInUser.firstName + ' ' + loggedInUser.lastName}</b>  </div>
          <div className="itemLine"> <b>Username:</b> {loggedInUser.username} </div>
        </div>
        <Title titleString='My Likes' isSubtitle titleSize="25"/>
        <LikedImageList/>
      </div>
    );
  } else {
    return (
      <Redirect to='/login' />
    )
  }
}

export default Profile;
