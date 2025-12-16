import React, { useState, useEffect } from "react";
import "./Home.css";
import FilterGroup from "../components/MovieList/FilterGroup";
import MovieCard from "../components/MovieList/MovieCard";
import _ from "lodash";
import { searchMovies } from "../services/movieApi";
import Search from "../assets/search.png";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterMovies, setFilterMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState({
    by: "default",
    order: "desc",
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  // Sort movies
  useEffect(() => {
      if (sort.by === "default") return;
        const sortedMovies = _.orderBy(
          [...filterMovies],
          [sort.by],
          [sort.order]
        );

      setFilterMovies(sortedMovies);
  }, [sort, filterMovies]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=183928bab7fc630ed0449e4f66ec21bd`
      );
      const data = await response.json();
        setMovies(data.results);
        setFilterMovies(data.results);
    } catch {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
};

  // Filter movies by rating
  const handleFilter = (rate) => {
    if (rate === minRating) {
      setMinRating(0);
      setFilterMovies(movies);
    } else {
      setMinRating(rate);
      const filtered = movies.filter((movie) => movie.vote_average >= rate);
      setFilterMovies(filtered);
    }
  };

  // Sort change handler
  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
  };

  // Search movies
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setFilterMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <section className="movie_list">
        <header className="movie_list__header">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search your movie..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              <img src={[Search]} alt="search_icon" className="search_icon" />
            </button>
          </form>

          <div className="movie_list_fs">
            <FilterGroup
              minRating={minRating}
              onRatingClick={handleFilter}
              ratings={[7, 6, 5]}
            />

            <select className="movie_sorting">
              <option value="popular">Popular</option>
              <option value="top-rated">Top Rated</option>
              <option value="Upcoming">Upcoming</option>
            </select>

            <select
              name="by"
              onChange={handleSort}
              value={sort.by}
              className="movie_sorting"
            >
              <option value="default">Sort By</option>
              <option value="release_date">Date</option>
              <option value="vote_average">Rating</option>
            </select>
          </div>
        </header>
      </section>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {filterMovies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>

      )}
    </div>
  );
}

export default Home;
