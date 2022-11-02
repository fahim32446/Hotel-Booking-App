import React, { useState, useContext } from 'react'
import useFetch from '../../hooks/useFetch'
import './Featured.css'
import { URL } from '../../const/url'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import FeaturedLoading from './featuredLoading'

const Featured = () => {



    const { data, loading, error } = useFetch(`${URL}/hotels/countByCity?cities=Dhaka,Chittagong,Sylhet`)

    const navigate = useNavigate();
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
            key: "selection",
        },
    ]);

    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });

    const { dispatch } = useContext(SearchContext);

    const handleClick = (destination) => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, date, options } });
        navigate("/hotels", { state: { destination, date, options } });
    };


    return (
        loading ? <div className="featured">
            <FeaturedLoading />
            <FeaturedLoading />
            <FeaturedLoading />
        </div> : (
            <>
                <div className="featured">
                    <div style={{ cursor: "pointer" }} onClick={() => handleClick('Dhaka')} className="featuredItem">
                        <img
                            src="https://cdn.britannica.com/97/189797-050-1FC0041B/Night-view-Dhaka-Bangladesh.jpg"
                            alt=""
                            className="featuredImg"
                        />
                        <div className="featuredTitles">
                            <h1>Dhaka</h1>
                            <h2>{data[0]}</h2>
                        </div>
                    </div>

                    <div style={{ cursor: "pointer" }} onClick={() => handleClick('Chittagong')} className="featuredItem">
                        <img
                            src="https://images.pexels.com/photos/799091/pexels-photo-799091.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt=""
                            className="featuredImg"
                        />
                        <div className="featuredTitles">
                            <h1>Chittagong</h1>
                            <h2>{data[1]}</h2>
                        </div>
                    </div>
                    <div style={{ cursor: "pointer" }} onClick={() => handleClick('Sylhet')} className="featuredItem">
                        <img
                            src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
                            alt=""
                            className="featuredImg"
                        />
                        <div className="featuredTitles">
                            <h1>Sylhet</h1>
                            <h2>{data[2]}</h2>
                        </div>
                    </div>

                </div>
            </>)
    )
}

export default Featured