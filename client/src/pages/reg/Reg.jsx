import axios from "axios";
import "./Reg.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { URL } from "../../const/url";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const Reg = () => {

    const [regInfo, setRegInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);


    const navigate = useNavigate()

    const handleChange = (e) => {
        setRegInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };


    const handleClick = async (e) => {
        e.preventDefault();

        setLoading(true)
        try {
            const res = await axios.post(`${URL}/auth/register`, regInfo);
            setData(res.data);
            navigate("/login")
        } catch (err) {
            setError(err.response.data);
            setLoading(false)
        }

    };
    return (
        <>
            <Navbar />
            <div className="Reg">
                <div className="regSideImg">
                    <img src="https://content.presspage.com/uploads/1376/1920_mtcookhookerlakenewzealand-2.jpg?10000" alt="" srcset="" />
                </div>

                <div className="regForm">
                    <form onSubmit={handleClick} className="lContainerReg">
                        <input
                            type="name"
                            placeholder="Username"
                            id="username"
                            onChange={handleChange}
                            className="lInputReg"
                            required={true}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            onChange={handleChange}
                            className="lInputReg"
                            required={true}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            onChange={handleChange}
                            className="lInputReg"
                            required={true}
                        />

                        <input
                            type="text"
                            placeholder="Your country"
                            id="country"
                            onChange={handleChange}
                            className="lInputReg"
                            required={true}
                        />

                        <input
                            type="text"
                            placeholder="Your city"
                            id="city"
                            onChange={handleChange}
                            className="lInputReg"
                            required={true}
                        />

                        <input
                            type="number"
                            placeholder="Your phone number"
                            id="phone"
                            onChange={handleChange}
                            className="lInputReg"
                            required={true}
                        />

                        <input
                            className='imageInput'
                            type="file"
                            placeholder="Your Profile Picture"
                            id="img"
                            onChange={handleChange}
                        // className="lInputReg"

                        />
                        <button type="submit" disabled={loading} className="lButtonReg">
                            Registration
                        </button>
                        {error && <span>{error.message}</span>}
                        <p className="registrationText">Already have an account
                            <Link style={{ color: 'yellow', textDecoration: 'none' }} to='../login'> Login Here</Link>
                        </p>
                    </form>
                </div>



            </div>
        </>
    )
}

export default Reg