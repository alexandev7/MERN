import React from "react";

import Title from '../Title/Title';
import dashboardItems from '../../Assets/Data/dashboardItems';
import { useLogin } from '../../loginContext';
import { useParams, Redirect} from "react-router-dom";

import './DashboardDetails.css';

const DashboardDetails = () => {
  let urlParams : any = {};
  urlParams  = useParams();
  const { loggedIn } = useLogin();

  if (loggedIn){
    return (
      <div>
          <Title titleString='My Details'/>
          <div className="dashboard-details" >
            {dashboardItems.map( item => {
              if (item.number === Number.parseInt(urlParams.id)) {
                return (
                    <div className="dashboardItem-detail-listed" >
                      <div className="itemLine-number-detailed"> {item.number} </div>
                      <div className="itemLine-title-detailed"> {item.title} </div>
                      <div className="itemLine-details"> {item.description} </div>
                      <div className="itemLine-details"> {item.detail1} </div>
                      <div className="itemLine-details"> {item.detail2} </div>
                    </div>
                )
              }
          })}
          </div>
      </div>
    );
  } else { return( <Redirect to='/login' /> ) }
}

export default DashboardDetails;
