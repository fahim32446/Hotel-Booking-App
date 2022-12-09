import React from "react";
import "./FeaturedProperties.css";
import useFetch from "../../hooks/useFetch";
import { URL } from "../../const/url";
import FeaturedPropertiesLoading from "./FeaturedPropertiesLoading";
import { useNavigate } from "react-router-dom";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    `${URL}/hotels?featured=true&limit=4`
  );
  const navigate = useNavigate();

  return (
    <div className="container mx-auto max-w-5xl py-2 px-2 md:px-0">
      <div className="flex flex-wrap justify-between gap-[10px]">
        {loading ? (
          <div className="flex">
            <FeaturedPropertiesLoading /> <FeaturedPropertiesLoading />{" "}
            <FeaturedPropertiesLoading />
          </div>
        ) : (
          <>
            {data.map((item) => (
              <div onClick={navigate} className="w-[47%] md:w-[23%] " key={item._id}>
                <img className="w-full min-h-[200px] rounded-lg" src={item.photos[0]} />
                <span className="text-lg text-semibold inline-block ">
                  {item.name}
                </span>
                <span className="w-full inline-block">{item.city}</span>
                <span className="inline-block">Starting from ${item.cheapestPrice}</span>
                {item.rating && (
                  <div className="">
                    <button>{item.rating}</button>
                    <span>Excellent</span>
                  </div>
                )}
              </div>
            ))}
          </>
        )}{" "}
      </div>
    </div>
  );
};

export default FeaturedProperties;
