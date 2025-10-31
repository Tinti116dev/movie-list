import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (Array.isArray(favorites) && favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>You have no favorite movies yet.</h2>
      <p>Why not add some? They will appear here when you do!</p>
    </div>
  );
}

export default Favorites;