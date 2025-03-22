import React from 'react'
import "./styles.css"
import { Movie } from '../models/movie'
import SingleMovie from './SingleMovie'

interface Props {
    movies: Movie[],
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>
}

const MovieList: React.FC<Props> = ({movies, setMovies}: Props) => {
  return (
    <div className="movies">
      {movies.map((movie) => (
        <SingleMovie movie={movie} key={movie.id} movies={movies} setMovies={setMovies}/>
      ))}
    </div>
  )
}

export default MovieList
