import React from 'react'
import './Sidebar.scss'
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";



const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to="/" style={{ textDecoration: "none", cursor: 'pointer' }}>
        <div className="top">
          <span className='logo'>Admin Dashboard</span>
        </div>
      </Link>
      <hr />

      <div className="center">
        <ul>
          <p className="title">MAIN</p>

          <Link to="/" style={{ textDecoration: "none" }}>
            <li><DashboardIcon className="icon" /><span>Dashboard</span></li>
          </Link>

          <p className="title">LISTS</p>

          <Link to="/users" style={{ textDecoration: "none" }}> <li>
            <PersonOutlineIcon className="icon" />
            <span>Users</span>
          </li>
          </Link>

          <Link to="/hotels" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Hotels</span>
            </li>
          </Link>

          <Link to="/rooms" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Rooms</span>
            </li>
          </Link>

         

        </ul>
      </div>


      {/* <div className="bottom">
        <div className="colorOption"> </div>
        <div className="colorOption"></div>
      </div> */}
    </div>

  )
}

export default Sidebar