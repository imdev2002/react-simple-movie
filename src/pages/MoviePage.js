import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import CardMovie, { CardMovieSkeleton } from "../components/movie/CardMovie";
import { IconSearch } from "../components/icons";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";

const itemsPerPage = 20;

const MoviePage = () => {
  const [nextPage, setNextPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular"));
  const filterDebounce = useDebounce(filter, 500);
  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };
  const { data, error } = useSWR(url, fetcher);
  const pageCount = data?.total_pages;
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };

  const movies = data?.results || [];
  const loading = !data && !error;
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
      <div className="my-10 text-lg">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default MoviePage;
