import { useState } from "react";
import { useEffect } from "react";
import SearchIcon from "./assets/search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?apikey=efdc71d8";
function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search || []);
    setSearch("");
  };
  useEffect(() => {
    searchMovies('');
  }, []);
  return (
    <div className="app">
      <h1>Movieland App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(search)}
        />
      </div>

      <div className="container">
        {movies.length === 0 && search.length > 0 && (
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>
        )}
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
