import React from "react";
import axios from 'axios'
import { useParams, Redirect } from "react-router-dom";

import Loading from "../Loading/Loading";
import Title from '../Title/Title';
import { useLogin } from '../../loginContext';
import { getCookieValue } from '../../helpers/Utils'

import './ImageDetails.css'

const ImageDetails = () => {
  let urlParams: any = {};
  urlParams = useParams();
  const { loggedIn } = useLogin();
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);

  React.useEffect(() => {

    const getImageUrl = async () => {
      const response = await axios.get(`https://api.unsplash.com/photos/${urlParams.imageId}`, { //used backticks
        headers: {
          Authorization: 'Client-ID pMOK70xWZkq-cbUDT7MY3XYMaJcRQmZrQ2knnVCoHHA'
        }
      }
      );
      console.log(response.data);
      setImageUrl(response.data.urls.regular);
    }

    const getFavorites = async () => {
      const response = await axios.get(`http://localhost:4001/api/favorites/`, {
        headers: {
          'x-token': getCookieValue("JWT")
        }
      }
      );
      console.log(response.data);
      const favorites = response.data.favorites;
      if (favorites && favorites.length){
        setLiked(!!favorites.find((favorite:any) => favorite.imageId === urlParams.imageId));  
      }
    }

    getImageUrl();
    getFavorites();
    

  }, []);

  const onButtonClick = async () => {

    if (!liked) { //handle like action
      await axios.post('http://localhost:4001/api/favorites', {
        imageId: urlParams.imageId
      },
        {
          headers: {
            'x-token': getCookieValue("JWT")
          }
        })
        .then(function (response) {

          console.log(response);
          if (response.data.ok) {
            setLiked(true);
          }

        })
        .catch(function (error) {
          console.log(error);
        });
    } else{ //handle dislike action
      const response = await axios.delete(`http://localhost:4001/api/favorites/${urlParams.imageId}`, {
        headers: {
          'x-token': getCookieValue("JWT")
        }
      }
      );
      setLiked(!response.data.ok);
    }
  }

  if (loggedIn) {
    return ( //implemented loading spinner
      <div className="ImageDetails">
        <Title titleString='My Image Details' />

        <div className={imageLoaded ? "dashboard detailed" : "dashboard loading"} >
          {imageLoaded ? null : <Loading />}
          <img className="detailed-image" src={imageUrl} style={imageLoaded ? {} : { display: 'none' }} onLoad={() => setImageLoaded(true)} />
        </div>
        <div className="like-section">
          <button className="like-button" onClick={onButtonClick}>
            {liked ? "Liked" : "Like"}
          </button>
        </div>

      </div>
    );
  } else { return (<Redirect to='/login' />) }
}

export default ImageDetails;
