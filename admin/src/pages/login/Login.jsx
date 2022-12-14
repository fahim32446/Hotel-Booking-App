import axios from "axios";
axios.defaults.withCredentials = true
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";
import { URL } from "../../const/url";
import React from "react";
import Cookies from 'universal-cookie';


const Login = () => {

  const cookies = new Cookies();

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };


  const handleClick = async (e) => {

    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {

      const res = await axios.post(`${URL}/auth/login`, credentials, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })

      if (res.data.isAdmin) {

        console.log(res.data);
        cookies.set('access_token', res.data?.access_token, { path: '/' });
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");

      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;