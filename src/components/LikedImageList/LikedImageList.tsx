import React, { FC } from "react";
import axios from "axios";

import { getCookieValue } from "../../helpers/Utils";
import LikedImage from "../LikedImage/LikedImage";

import './LikedImageList.css';

const LikedImageList = () => {

  const [likedImagesIds, setLikedImagesIds] = React.useState<string[]>([]);

  React.useEffect(() => {

    const getImageUrl = async () => {
      const response = await axios.get(`http://localhost:4001/api/favorites/`, {
        headers: {
          'x-token': getCookieValue("JWT")
        }
      }
      );
      const likedImages: string[] = [];
      response.data.favorites.map((favorite: any) => {
        likedImages.push(favorite.imageId)
      })
      setLikedImagesIds(likedImages);
    }

    getImageUrl();

  }, []);

  return (
    <div className="liked-image-result" >
      {
        likedImagesIds.map((imageId: string) => {
          return (
            <LikedImage imageId={imageId} />
          );
        })
      }
    </div>
  );
}

export default LikedImageList;
