import React, { useState, useContext } from 'react'
import useFetch from '../../hooks/useFetch'
import './Featured.css'
import { URL } from '../../const/url'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'

const Featured = () => {

    const { data, loading, error } = useFetch(`${URL}/hotels/countByCity?cities=Dhaka,London,Austin`)
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
        loading ? 'Please wait...' : (
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

                    <div className="featuredItem">
                        <img
                            src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
                            alt=""
                            className="featuredImg"
                        />
                        <div className="featuredTitles">
                            <h1>Reno</h1>
                            <h2>{data[1]}</h2>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img
                            src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
                            alt=""
                            className="featuredImg"
                        />
                        <div className="featuredTitles">
                            <h1>Austin</h1>
                            <h2>{data[2]}</h2>
                        </div>
                    </div>

                </div>
            </>)
    )
}

export default Featured