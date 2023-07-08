import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <section className="page-container">
        <h2 className="mb-3 text-3xl font-semibold text-white">Now Playing</h2>
        <MovieList></MovieList>
      </section>
      <section className="page-container">
        <h2 className="mb-3 text-3xl font-semibold text-white">Popular</h2>
        <MovieList type="popular"></MovieList>
      </section>
      <section className="mb-5 page-container">
        <h2 className="mb-3 text-3xl font-semibold text-white">Top Rated</h2>
        <MovieList type="top_rated"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
