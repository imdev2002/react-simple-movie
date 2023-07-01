import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import CardMovie from "./CardMovie";
import { Swiper, SwiperSlide } from "swiper/react";

const MovieList = ({ type = "now_playing" }) => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}/?api_key=d64fc6923e69c12a1565bcbe58d01d30
    `,
    fetcher
  );

  const movies = data?.results || [];
  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={20} slidesPerView={"auto"}>
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <CardMovie movie={movie}></CardMovie>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
