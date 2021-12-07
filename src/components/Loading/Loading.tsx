import React from "react";

import LoadingImage from '../../Assets/Images/Loading.gif'

import './Loading.css';

const Loading = () => {
    return (
        <div className='Loading'>
            <img src={LoadingImage}/>
        </div>
    );
}

export default Loading;