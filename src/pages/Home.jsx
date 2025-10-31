import MovieCard from "../components/MovieCard";
import { useState, useEffect, useCallback } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleSearch = useCallback(async () => {
    if (!debouncedSearchQuery.trim()) {
      setMovies([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const searchResults = await searchMovies(debouncedSearchQuery);
      if (searchResults.length === 0) {
        setError("No movies found for your query.");
      } else {
        setMovies(searchResults);
        setError(null);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchQuery]);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    if (!debouncedSearchQuery.trim()) {
      loadPopularMovies();
    } else {
      handleSearch();
    }
  }, [debouncedSearchQuery, handleSearch]);

  return (
    <div className="home">
      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {Array.isArray(movies) && movies.length > 0 ? (
            movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          ) : (
            <div className="no-results">{error || "No movies to display."}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;