import React, { ChangeEvent } from "react";
import _ from 'underscore';
import axios from "axios";
import { useHistory } from 'react-router-dom';

import Title from '../Title/Title';
import defaultImage from '../../Assets/Images/default-profile.jpeg'
import { useLogin } from '../../loginContext';

import './FileUpload.css';

const Register = () => {
  let history = useHistory();
  const [fileWasLoaded, setFileWasLoaded] = React.useState<boolean>(false);
  const [imageURI, setImageURI] = React.useState<string>(defaultImage);
  const { userBeingRegistered } = useLogin(); // switched to context API
  //const currentUsers = localStorage.getItem("users");
  //let parsedUsers = currentUsers ? JSON.parse(currentUsers) : {};

  const onFormSubmit = async (e:React.FormEvent) => { //moved actual user change here
    e.preventDefault();
    console.log(userBeingRegistered);

    await axios.post('http://localhost:4001/api/user/new', {
            username: userBeingRegistered.username,
            password: userBeingRegistered.password,
            profileImage: imageURI
          })
          .then(function (response) {
            console.log(response);
            console.log(userBeingRegistered);
            history.push('/login');
          })
          .catch(function (error) {
            
            console.log(error);
            console.log(userBeingRegistered);
          });
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(userBeingRegistered);
    let files = e.target.files;
    let reader = new FileReader();
    if (files) { reader.readAsDataURL(files[0]) }
    reader.onload = (e: any) => {
      setImageURI(e.target.result);
    }
    setFileWasLoaded(true);
  }

  return (
    <div className="File-Upload">
      <Title titleString='Upload your Picture!' />
      <div className="loading-section">
        <img className="profile-image" src={imageURI} />
        <form className="form-section" onSubmit={onFormSubmit}>
          <label className="btn btn-outline-dark">
            <input type="file" onChange={onChange} />
            <i className="fa fa-cloud-upload"></i> {fileWasLoaded ? 'Change Picture' : 'Upload My Picture'}
          </label>
          {
            fileWasLoaded &&
            <label className="btn btn-outline-dark">
              <input type="submit" name="Submit" value="Submit" />
              Done!
            </label>
          }
        </form>
      </div>
    </div>
  );
}

export default Register;