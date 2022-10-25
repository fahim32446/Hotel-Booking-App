import React from 'react'
import './Widget.scss';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HotelIcon from '@mui/icons-material/Hotel';
import RoomIcon from '@mui/icons-material/Room';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';


const Widget = ({ type }) => {

  let data;
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "hotel":
      data = {
        title: "HOTEL",
        isMoney: false,
        link: <Link style={{ textDecoration: 'none' }}  to={'hotels'}>View all hotels</Link>,
        icon: (
          <HotelIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "room":
      data = {
        title: "ROOMS",
        isMoney: false,
        link:  <Link style={{ textDecoration: 'none' }}  to={'rooms'}>View all rooms</Link>,
        icon: (
          <RoomIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "users":
      data = {
        title: "USERS",
        isMoney: false,
        link: <Link style={{ textDecoration: 'none' }}  to={'rooms'}>View all rooms</Link>,
        icon: (
          <PersonIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    // case "balance":
    //   data = {
    //     title: "BALANCE",
    //     isMoney: true,
    //     link: "See details",
    //     icon: (
    //       <AccountBalanceWalletOutlinedIcon
    //         className="icon"
    //         style={{
    //           backgroundColor: "rgba(128, 0, 128, 0.2)",
    //           color: "purple",
    //         }}
    //       />
    //     ),
    //   };
    //   break;
    default:
      break;
  }



  return (
    <div className="widget">
    <div className="left">
      <span className="title">{data.title}</span>
      <span className="counter">
        {data.isMoney && "$"} {amount}
      </span>
      <span className="link">{data.link}</span>
    </div>
    <div className="right">
      <div className="percentage positive">
        <KeyboardArrowUpIcon />
        {diff} %
      </div>
      {data.icon}
    </div>
  </div>
  )
}

export default Widget