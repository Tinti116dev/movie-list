const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchJsonOrThrow(url) {
  const response = await fetch(url);
  let data;
  let text;
  try {
    text = await response.text();
    data = text ? JSON.parse(text) : null;
  } catch (err) {
    // non-json response or parse error; include raw text if available
    throw new Error(`Unexpected response: ${text || err.message}`);
  }

  if (!response.ok) {
    // The API returns structured error messages (status_message)
    const msg = data?.status_message || data?.message || "Request failed";
    const status = data?.status_code || response.status;
    const err = new Error(`TMDB API error (${status}): ${msg}`);
    err.status = status;
    throw err;
  }

  return data;
}

export const getPopularMovies = async () => {
  if (!API_KEY) {
    throw new Error(
      "Missing TMDB API key. Please set VITE_TMDB_API_KEY in your .env file"
    );
  }

  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
  const data = await fetchJsonOrThrow(url);
  return data.results || [];
};

export const searchMovies = async (query) => {
  if (!API_KEY) {
    throw new Error(
      "Missing TMDB API key. Please set VITE_TMDB_API_KEY in your .env file"
    );
  }

  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}`;
  const data = await fetchJsonOrThrow(url);
  return data.results || [];
};