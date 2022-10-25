import React, { useContext } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {

    const { user, dispatch } = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link style={{ textDecoration: 'none', color: 'white' }} to='/' >
                    <span className="logo">Booking.com</span>
                </Link>
                {user ?
                    <div className="navItems">
                        <button className="navButton">{user.username.toUpperCase()}</button>
                        <button onClick={() => dispatch({ type: "LOGOUT" })} className="navButton">Log Out</button>
                    </div>

                    : (
                        <div className="navItems">
                            <button className="navButton">Register</button>
                            <Link to='../login'>
                                <button className="navButton">Login</button>
                            </Link>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Navbar