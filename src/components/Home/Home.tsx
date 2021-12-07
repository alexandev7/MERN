import React from "react";

import logo from '../../Assets/Images/task-logo.png'
import Title from '../Title/Title'

import './Home.css';

const Home = () => {
  return (
    <div>
        <Title titleString='Welcome to Tarea'/>
        <img src={logo} alt='Task logo' className='logo'/>
    </div>
  );
}

export default Home;
