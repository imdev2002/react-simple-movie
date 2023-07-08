import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import CardMovie, { CardMovieSkeleton } from "./CardMovie";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 } from "uuid";

const MovieList = ({ type = "now_playing" }) => {
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const loading = !data && !error;

  const movies = data?.results || [];
  return (
    <>
      {loading && (
        <div className="movie-list">
          <Swiper grabCursor={"true"} spaceBetween={20} slidesPerView={"auto"}>
            {new Array(5).fill(0).map((item) => (
              <SwiperSlide key={v4()}>
                <CardMovieSkeleton></CardMovieSkeleton>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={20} slidesPerView={"auto"}>
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <CardMovie movie={movie}></CardMovie>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default MovieList;
