import React from 'react'
import './FeaturedProperties.css'
import useFetch from '../../hooks/useFetch'
import { URL } from '../../const/url'
import FeaturedPropertiesLoading from './FeaturedPropertiesLoading'
import { useNavigate } from 'react-router-dom'

const FeaturedProperties = () => {

  const { data, loading, error } = useFetch(`${URL}/hotels?featured=true&limit=4`)
  const navigate = useNavigate();

  return (
    <div className="fp">
      {loading ? <div className='FPL'>
        <FeaturedPropertiesLoading /> <FeaturedPropertiesLoading /> <FeaturedPropertiesLoading />
      </div> : (
        <>
          {data.map((item) => (
            <div onClick={navigate} className="fpItem" key={item._id}>

              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default FeaturedProperties