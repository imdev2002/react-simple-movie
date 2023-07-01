import React from "react";
import { WatchIcon } from "../icons";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "../../config";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming/?api_key=d64fc6923e69c12a1565bcbe58d01d30`,
    fetcher
  );

  const movies = data?.results || [];
  console.log("🚀 ~ file: Banner.js:15 ~ Banner ~ movies:", movies);
  return (
    <section className="banner relative h-[460px] overflow-hidden rounded-lg banner page-container">
      <Swiper>
        {movies.length > 0 &&
          movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <BannerItem movie={movie}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

const BannerItem = ({ movie }) => {
  const { vote_average, title, poster_path, release_date } = movie;
  return (
    <div className="w-full h-full">
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        className="object-cover w-full h-full"
        alt=""
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0.1)]"></div>
      <div className="absolute flex flex-col gap-4 text-white left-5 bottom-10">
        <h3 className="text-5xl font-semibold">{title}</h3>
        <div className="flex gap-2">
          <span className="px-2 py-1 text-xs font-semibold border-2 border-[rgba(255,255,255,0.4)] rounded-md">
            Action
          </span>
          <span className="px-2 py-1 text-xs font-semibold border-2 border-[rgba(255,255,255,0.4)] rounded-md">
            Action
          </span>
        </div>
        <button className="flex items-center w-[120px] justify-center gap-2 px-4 py-2 rounded-lg bg-primary">
          Watch
          <WatchIcon></WatchIcon>
        </button>
      </div>
    </div>
  );
};

export default Banner;
