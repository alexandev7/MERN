import React, { FC } from "react";

import { ImageItem, ImageSearchApiResponse } from "../../shared/types";
import Image from "../Image/Image";

import './ImageList.css';

const ImageList: FC<ImageSearchApiResponse> = ({ results }) => { // implemented types and destructuring

  const images = results.map((image: ImageItem) => { //implemented image component
    return (
      <Image alt_description={image.alt_description} id={image.id} urls={image.urls} created_at={image.created_at} />
    );
  })

  return (
    <>
      {!!results.length &&
        <div className="image-result" >
          {images}
        </div>
      }
    </>
  );
}

export default ImageList;
