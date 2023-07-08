import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import CardMovie, { CardMovieSkeleton } from "../components/movie/CardMovie";
import { IconSearch } from "../components/icons";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import useSWRInfinite from "swr/infinite";
import { v4 } from "uuid";
import { Button } from "../components/button";

const itemsPerPage = 20;

const MoviePageLoadMore = () => {
  const [nextPage, setNextPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular"));
  const filterDebounce = useDebounce(filter, 500);
  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );
  // const { data, error } = useSWR(url, fetcher);
  const pageCount = data?.total_pages;
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };

  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  const loading = !data && !error;
  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);
  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [filterDebounce, nextPage]);
  return (
    <div className="page-container">
      <div className="flex justify-center mb-10">
        <input
          onChange={handleChangeFilter}
          className="flex-1 p-2 text-lg text-white outline-none bg-slate-500 bg-opacity-20 h-14 focus:bg-opacity-30"
          type="text"
        />
        <span className="flex items-center justify-center cursor-pointer w-14 bg-primary">
          <IconSearch></IconSearch>
        </span>
      </div>
      {/* {loading && (
        <span className="block mx-auto border-4 rounded-full w-14 h-14 border-primary border-t-transparent animate-spin"></span>
      )} */}
      {loading && (
        <div className="grid grid-cols-5 gap-4">
          {new Array(10).fill(0).map((item) => (
            <CardMovieSkeleton key={v4()}></CardMovieSkeleton>
          ))}
        </div>
      )}
      <div className="grid grid-cols-5 gap-4">
        {movies.length > 0 &&
          movies.map((movie) => (
            <CardMovie key={movie.id} movie={movie}></CardMovie>
          ))}
      </div>
      <div className="flex justify-center my-5">
        <Button
          className={`w-[200px] text-lg text-white ${
            isReachingEnd ? "hidden" : ""
          }`}
          onClick={() => setSize(size + 1)}
        >
          Load more
        </Button>
      </div>
    </div>
  );
};

export default MoviePageLoadMore;
