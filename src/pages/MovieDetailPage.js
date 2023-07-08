import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { fetcher, tmdbAPI } from "../config";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetail(id), fetcher);
  const { data: credits } = useSWR(
    tmdbAPI.getMovieMeta(id, "credits"),
    fetcher
  );
  const { data: videos } = useSWR(tmdbAPI.getMovieMeta(id, "videos"), fetcher);
  if (!data) return null;
  const movie = data;
  const casts = credits?.cast || [];
  console.log(
    "🚀 ~ file: MovieDetailPage.js:17 ~ MovieDetailPage ~ casts:",
    casts
  );
  const trailers = videos?.results || [];
  return (
    <div className="page-container">
      <div className="relative h-[70vh]">
        <div
          className="w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url('${tmdbAPI.getImg(movie.backdrop_path)}')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      <div className="w-full h-[400px] max-w-[340px] mx-auto -mt-[200px] z-10 relative mb-5">
        <img
          className="object-cover w-full h-full"
          src={tmdbAPI.getImg(movie.poster_path, "w500")}
          alt=""
        />
      </div>
      <div className="flex flex-col gap-5 text-white">
        <h2 className="my-4 text-5xl font-semibold text-center">
          {movie.title}
        </h2>
        <div className="flex justify-center gap-4 text-white">
          {movie.genres.map((genre) => (
            <span
              key={genre.id}
              className="px-4 py-2 border rounded-full cursor-pointer text-primary border-primary"
            >
              {genre.name}
            </span>
          ))}
        </div>
        <div>
          <p className="text-center">{movie.overview}</p>
        </div>
        <div>
          <h3 className="my-4 text-3xl text-center">Cast</h3>

          <div className="grid grid-cols-4 gap-4">
            {casts.length > 0 &&
              casts
                .slice(1, 5)
                .map((cast) => <CastItem key={cast.id} cast={cast}></CastItem>)}
          </div>
        </div>
        <div>
          {trailers.length > 0 && (
            <h3 className="my-4 text-3xl text-center">Trailers</h3>
          )}

          <div className="flex flex-col gap-y-5">
            {trailers.length > 0 &&
              trailers
                .slice(0, 2)
                .map((trailer) => (
                  <TrailerItem key={trailer.id} data={trailer}></TrailerItem>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CastItem = ({ cast }) => {
  return (
    <div>
      <div className="w-[300px] h-[400px]">
        <img
          className="object-cover w-full h-full"
          src={tmdbAPI.getImg(cast.profile_path, "w500")}
          alt=""
        />
      </div>
      <div className="flex flex-col items-center mt-2 text-white">
        <p className="text-lg font-semibold">{cast.character}</p>
        <p className="text-sm">{cast.original_name}</p>
      </div>
    </div>
  );
};

const TrailerItem = ({ data }) => {
  return (
    <div>
      <iframe
        width="1280"
        height="720"
        src={`https://www.youtube.com/embed/${data.key}`}
        title={data.name}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MovieDetailPage;
