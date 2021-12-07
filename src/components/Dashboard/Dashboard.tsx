import React from "react";

import dashboardItems from '../../Assets/Data/dashboardItems';
import Title from '../Title/Title';
import { useHistory, Redirect } from 'react-router-dom';
import { useLogin } from '../../loginContext';

import './Dashboard.css';

const Dashboard = () => {
  let history = useHistory();
  const { loggedIn } = useLogin();
  
  if (loggedIn){
    return (
      <div>
          <Title titleString='My Dashboard'/>
          <div className="dashboard" >
            {dashboardItems.map( item => {
              return (
                  <div key={item.number} className="dashboardItem-item" onClick={() => {history.push('/details/'+item.number)}} >
                    <div className="itemLine-number"> {item.number} </div>
                    <div className="dashboard-itemLine-title"> {item.title} </div>
                    <div className="dashboard-itemLine"> {item.description} </div>
                  </div>
              )
            })}
          </div>
      </div>
    );
  } else {
    return(
      <Redirect to='/login' />
    )
  }
}
export default Dashboard;