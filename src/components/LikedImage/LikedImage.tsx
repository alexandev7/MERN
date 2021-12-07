import React, {FC}from "react"
import axios from "axios";

import { ILikedImage } from "../../shared/types";

const LikedImage:FC<ILikedImage> = ({imageId}) => {

    const [imageUrl, setImageUrl] = React.useState<string>('');
    
    React.useEffect(()=>{

        const getImageUrl = async () => {
          const response = await axios.get(`https://api.unsplash.com/photos/${imageId}`, {
              headers:{
                Authorization: 'Client-ID pMOK70xWZkq-cbUDT7MY3XYMaJcRQmZrQ2knnVCoHHA'
              }
            }
          );
          console.log(response.data);
          setImageUrl(response.data.urls.thumb);
        }
    
        getImageUrl();
    
      }, []);

    return (
        <div className="image-line" > 
            <img className="liked-image-thumbnail" src={imageUrl}></img>
        </div>
    );
}

export default LikedImage;