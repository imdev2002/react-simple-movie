import React from "react";
import { WatchIcon } from "../icons";
import MovieList from "./MovieList";

const CardMovie = ({ movie }) => {
  const { vote_average, title, poster_path, release_date } = movie;
  return (
    <div className="relative p-3 overflow-hidden text-white rounded-lg bg-[rgba(255,255,255,0.1)] select-none">
      <div className="absolute inset-3 z-[-1] overflow-hidden blur-2xl">
        <div
          className="w-full h-full blur-3xl"
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/w500/${poster_path}')`,
          }}
        ></div>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="h-[250px] w-full object-cover rounded-lg"
      />
      <div className="flex flex-col gap-2 mt-2">
        <h3 className="font-semibold line-clamp-1">{title}</h3>
        <div className="flex items-center justify-between text-xs text-gray-200">
          <p>{new Date(release_date).getFullYear()}</p>
          <div className="flex items-center gap-1">
            <p className="">{vote_average}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 16 16"
            >
              <path
                fill="#ffaa01"
                d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815l4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97l.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
              />
            </svg>
          </div>
        </div>
        <button className="flex items-center justify-center w-full gap-2 px-4 py-2 rounded-lg bg-primary">
          Watch now
          <WatchIcon></WatchIcon>
        </button>
      </div>
    </div>
  );
};

export default CardMovie;
