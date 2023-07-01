import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { WatchIcon } from "./components/icons";
import MovieList from "./components/movie/MovieList";
import Banner from "./components/movie/Banner";
import "swiper/css";

function App() {
  return (
    <Fragment>
      <header className="flex items-center justify-center gap-4 py-10 text-white header">
        <NavLink className="text-primary">Home</NavLink>
        <NavLink>Movies</NavLink>
      </header>
      <Banner></Banner>
      <section className="page-container">
        <h2 className="mb-3 text-4xl font-semibold text-white">Now Playing</h2>
        <MovieList></MovieList>
      </section>
      <section className="page-container">
        <h2 className="mb-3 text-4xl font-semibold text-white">Popular</h2>
        <MovieList type="popular"></MovieList>
      </section>
      <section className="page-container">
        <h2 className="mb-3 text-4xl font-semibold text-white">Top Rated</h2>
        <MovieList type="top_rated"></MovieList>
      </section>
    </Fragment>
  );
}

export default App;
