import React from "react";
import useFetch from "../hooks/useFetch";
import { URL } from "../const/url";
import PropertyLoading from "../components/propertyList/PropertyLoading";
const test = () => {
  const { data, loading, error } = useFetch(`${URL}/hotels/countByType`);

  const images = [
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ];

  return (
    <div className="container mx-auto max-w-5xl py-2 px-2 md:px-0">
      {loading ? (
        <div className="flex flex-wrap">
          <PropertyLoading />
          <PropertyLoading />
          <PropertyLoading />
          <PropertyLoading />
        </div>
      ) : (
        <div className="flex flex-row flex-wrap gap-3 justify-center">
          {data &&
            images.map((img, i) => (
              <div className="w-[48%] md:w-[23%] bg-cover" key={i}>
                <img
                  src={img}
                  className="border w-[100%] h-[80%] bg-cover overflow-hidden rounded-lg"
                />
                <div className="">
                  <h1 className="font-semibold capitalize">{data[i]?.type}</h1>
                  <h2>
                    {data[i]?.count} {data[i]?.type}
                  </h2>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default test;
