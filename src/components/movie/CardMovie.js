import React from "react";
import { WatchIcon } from "../icons";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config";
import Skeleton from "../loading/Skeleton";
import { Button } from "../button";

const CardMovie = ({ movie }) => {
  const { vote_average, title, poster_path, release_date, id } = movie;
  const navigate = useNavigate();
  return (
    <div className="relative p-3 overflow-hidden text-white rounded-lg bg-[rgba(255,255,255,0.1)] select-none">
      <div className="absolute inset-3 z-[-1] overflow-hidden blur-2xl">
        <div
          className="w-full h-full blur-3xl"
          style={{
            backgroundImage: `url('${tmdbAPI.getImg(poster_path, "w500")}')`,
          }}
        ></div>
      </div>
      <img
        src={tmdbAPI.getImg(poster_path, "w500")}
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

        <Button onClick={() => navigate(`/movie/${id}`)}>
          Watch now
          <WatchIcon></WatchIcon>
        </Button>
      </div>
    </div>
  );
};

export default CardMovie;

export const CardMovieSkeleton = () => {
  return (
    <div className="relative p-3 overflow-hidden text-white rounded-lg bg-[rgba(255,255,255,0.1)] select-none">
      <Skeleton height="250px" width="100%" rounded="8px"></Skeleton>
      <div className="flex flex-col gap-2 mt-2">
        <Skeleton height="24px" width="100%" rounded="4px"></Skeleton>
        <div className="flex items-center justify-between text-xs text-gray-200">
          <Skeleton height="16px" width="50px" rounded="4px"></Skeleton>

          <div className="flex items-center gap-1">
            <Skeleton height="16px" width="24px" rounded="4px"></Skeleton>

            <Skeleton height="16px" width="16px" rounded="4px"></Skeleton>
          </div>
        </div>
        <Skeleton height="40px" width="100%" rounded="8px"></Skeleton>
      </div>
    </div>
  );
};
