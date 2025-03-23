import React from 'react'
import "./styles.css"
import { Movie } from '../models/movie'
import SingleMovie from './SingleMovie'

interface Props {
    movies: Movie[],
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
    watchedMovies: Movie[],
    setWatchedMovies: React.Dispatch<React.SetStateAction<Movie[]>>
}

const MovieList: React.FC<Props> = ({movies, setMovies}: Props) => {
  return (
    <div className="container">
      <div className="movies">
        <b className="movies__heading">
          Watchlist
        </b>
      {
        movies.map((movie) => (
          <SingleMovie movie={movie} movies={movies} key={movie.id} setMovies={setMovies} />
        ))
      }
      </div>
      <div className="movies watched">
      <i className="movies__heading">
          Watched
        </i>
      {
        movies.map((movie) => (
          <SingleMovie movie={movie} movies={movies} key={movie.id} setMovies={setMovies} />
        ))
      }
      </div>
    </div>
  )
}

export default MovieList
