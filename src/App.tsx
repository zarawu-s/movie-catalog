import React, { useState } from 'react';
import './App.css';
import AddMovieField from './components/AddMovieField';
import { Movie } from './models/movie';
import MovieList from './components/MovieList';

const App: React.FC = () => {

  const [movie, setMovie] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (movie) {
      setMovies([...movies, { id:Date.now(), name: movie, watched: false}]);
      setMovie("");
    }
  };

  return (
    <div className="App">
      <span className="heading">Movie Catalog</span>
      <AddMovieField movie={movie} setMovie={setMovie} handleAdd={handleAdd} />
      <MovieList movies={movies} setMovies={setMovies} />
    </div>
  );
}

export default App;
