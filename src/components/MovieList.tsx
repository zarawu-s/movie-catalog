import React, { useEffect, useRef, useState } from 'react'
import "./styles.css"
import { Movie } from '../models/movie'
import SingleMovie from './SingleMovie'
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import invariant from 'tiny-invariant'

interface Props {
    movies: Movie[],
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
    watchedMovies: Movie[],
    setWatchedMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
}

const MovieList: React.FC<Props> = ({movies, setMovies, watchedMovies, setWatchedMovies}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const nullWatchedMovie: Movie = {id: 0, name: "", watched: true};
  const nullWatchlistMovie: Movie = {id: 0, name: "", watched: false};

  return (
    <div ref={ref} className="container">
      <div className="movies">
        <b className="movies__heading">
          Watchlist
        </b>
      {
        (movies.length > 0) ? 
          movies.map((movie) => (
          <SingleMovie movie={movie} movies={movies} key={movie.id} setMovies={setMovies} watchedMovies={watchedMovies} setWatchedMovies={setWatchedMovies} />
        ))
      : 
        <SingleMovie movie={nullWatchlistMovie} movies={movies} key={nullWatchlistMovie.id} setMovies={setMovies} watchedMovies={watchedMovies} setWatchedMovies={setWatchedMovies} />
      }
      </div>
      <div className="movies watched">
      <i className="movies__heading">
          Watched
        </i>
      {
        (watchedMovies.length > 0) ? 
        watchedMovies.map((movie) => (
          <SingleMovie movie={movie} movies={movies} key={movie.id} setMovies={setMovies} watchedMovies={watchedMovies} setWatchedMovies={setWatchedMovies}/>
        )) 
        :
        <SingleMovie movie={nullWatchedMovie} movies={movies} key={nullWatchlistMovie.id} setMovies={setMovies} watchedMovies={watchedMovies} setWatchedMovies={setWatchedMovies} />
      }
      </div>
    </div>
  )
}

export default MovieList
