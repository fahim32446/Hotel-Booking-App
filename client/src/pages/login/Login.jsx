import axios from "axios";
import "./Login.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { URL } from "../../const/url";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";



const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(`${URL}/auth/login`, credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/")
        } catch (err) {

            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };


    return (

        <>
            <Navbar />
            <div className="login">

                <div className="loginImg">
                    <img src="https://content.presspage.com/uploads/1376/1920_mtcookhookerlakenewzealand-2.jpg?10000" alt="" srcset="" />
                </div>

                <div className="loginForm">
                    <form onSubmit={handleClick} className="lContainer">
                        <input
                            type="text"
                            placeholder="username"
                            id="username"
                            onChange={handleChange}
                            className="lInput"
                            required='true'
                        />
                        <input
                            type="password"
                            placeholder="password"
                            id="password"
                            onChange={handleChange}
                            className="lInput"
                            required='true'
                        />
                        <button type="submit" disabled={loading} className="lButton">
                            Login
                        </button>
                        {error && <span>{error.message}</span>}
                        <p className="registrationText">Don't have an account registration
                            <Link style={{ color: 'yellow', textDecoration: 'none' }} to='../registration'> Here</Link>
                        </p>
                    </form>

                </div>
            </div>



        </>
    );
};

export default Login