import {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) {
      try {
        setFavorites(JSON.parse(storedFavs));
      } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = useCallback((movie) => {
    setFavorites((prev) => [...prev, movie]);
  }, []);

  const removeFromFavorites = useCallback((movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  }, []);

  const favoriteMap = useMemo(() => {
    return new Map(favorites.map((movie) => [movie.id, movie]));
  }, [favorites]);

  const isFavorite = useCallback(
    (movieId) => {
      return favoriteMap.has(movieId);
    },
    [favoriteMap]
  );

  const value = useMemo(
    () => ({
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
    }),
    [favorites, addToFavorites, removeFromFavorites, isFavorite]
  );

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};