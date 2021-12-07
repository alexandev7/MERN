import React, {FC}from "react"
import { useHistory } from 'react-router-dom';

import { ImageItem } from "../../shared/types";

const Image:FC<ImageItem> = ({alt_description, created_at, urls, id}) => { //created image component
    const history = useHistory();
    return ( //use backticks for URL
        <div key={id} className="image-line" onClick={() => { history.push(`/imageDetails/${id}`) }} > 
            <img className="image-thumbnail" src={urls.thumb}></img>
            <div className="itemLine"> <b>Description:</b> {alt_description} </div>
            <div className="itemLine"> <b>Date:</b> {created_at} </div>
        </div>
    );
}

export default Image;