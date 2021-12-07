import React, { ChangeEvent, FormEvent } from "react";
import axios from 'axios'
import { useHistory, Redirect } from 'react-router-dom';

import ImageList from "../ImageList/ImageList";
import { ImageSearchApiResponse } from "../../shared/types";
import Loading from "../Loading/Loading"
import Title from '../Title/Title';
import { useLogin } from '../../loginContext';

import './MyPictures.css'; // organized import blocks

const MyPictures = () => { //implemented arrow functions
  const { loggedIn } = useLogin();
  const [imageList, setImageList] = React.useState<ImageSearchApiResponse>(); // implemented types here
  const [isLoading, setIsLoading] = React.useState(false);
  const [textInput, setTextInput] = React.useState("");
  
  const onFormSubmit = async (event:FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: textInput
        },
        headers:{
          Authorization: 'Client-ID pMOK70xWZkq-cbUDT7MY3XYMaJcRQmZrQ2knnVCoHHA'
        }
      }
    );
    setImageList(response.data);
    setIsLoading(false);
  }

  if (loggedIn){ //stopped using uncontrolled inputs, changed to textInput hook instead
    return (
      <div className="MyPictures">
          <Title titleString='My Pictures'/>
          <div className="search-section">
            <form className="picture-form" onSubmit={onFormSubmit}>
              <input type='text' onChange={e => setTextInput(e.target.value)}></input> 
              <input type="submit" name="Search" value="Search"/>
            </form>
          </div>
          {
            isLoading ? //implemented loading spinner
            <Loading/>
            :
            <ImageList results={imageList ? imageList.results : []}/>
          }
          
      </div>
    );
  } else {
    return(
      <Redirect to='/login' />
    )
  }
}

export default MyPictures;
