import React, { useContext } from "react";
// import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  return (
    // <div className="navbar">
    //     <div className="navContainer">
    //         <Link style={{ textDecoration: 'none', color: 'white' }} to='/' >
    //             <span className="logo">Booking.com</span>
    //         </Link>
    //         {user ?
    //             <div className="navItems">
    //                 <button className="navButton">{user.username.toUpperCase()}</button>
    //                 <button onClick={() => dispatch({ type: "LOGOUT" })} className="navButton">Log Out</button>
    //             </div>

    //             : (

    //                 <div className="navItems">
    //                     <Link style={{ color: 'yellow', textDecoration: 'none' }} to='../registration'>
    //                         <button className="navButton">Register</button> </Link>
    //                     <Link to='../login'>
    //                         <button className="navButton">Login</button>
    //                     </Link>
    //                 </div>
    //             )}
    //     </div>
    // </div>
    <div className="bg-[#003580]">
      <div className="container mx-auto max-w-5xl py-2 px-2 md:px-0">
        <div className="flex justify-between items-center">
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            <span className="logo text-[25px] font-bold">Booking.com</span>
          </Link>
          <div>
            {user ? (
              <div className="">
                <button className="">
                  {user.username.toUpperCase()}
                </button>
                <button
                  onClick={() => dispatch({ type: "LOGOUT" })}
                  className=""
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex gap-5">
                <Link
                  style={{  textDecoration: "none" }}
                  to="../registration"
                >
                  <button className="bg-white rounded-sm px-4 py-1 font-semibold">Register</button>
                </Link>
                <Link to="../login">
                  
                  <button className="bg-white rounded-sm px-4 py-1 font-semibold">Login</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
