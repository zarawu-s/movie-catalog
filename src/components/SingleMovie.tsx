import React, { useEffect, useRef, useState } from 'react'
import { Movie } from '../models/movie';
import {MdDelete} from "react-icons/md";
import {FaEdit, FaEye, FaEyeSlash} from "react-icons/fa"
import "./styles.css"
import {draggable, dropTargetForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {combine} from "@atlaskit/pragmatic-drag-and-drop/combine";
import invariant from 'tiny-invariant';


interface Props {
    movie: Movie;
    movies: Movie[];
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    watchedMovies: Movie[];
    setWatchedMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const SingleMovie: React.FC<Props> = ({movie, movies, setMovies, watchedMovies, setWatchedMovies}: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  const [edit, setEdit] = useState<boolean>(false);
  const [editMovie, setEditMovie] = useState<string>(movie.name);
  
  const handleEdit = (e: React.FormEvent, id:number) => {
    e.preventDefault();
    setMovies(movies.map((movie) => (
      movie.id === id ? {...movie, name: editMovie} : movie
    )));
    setEdit(false);
  };
  
  const handleDelete = (id: number) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };
  
  const handleWatched = (id: number) => {
    let movieWatchlist = movies.find((m) => (m.id === id));
    let movieWatched = watchedMovies.find((m) => (m.id === id));
    if (movieWatched) {
      setMovies([...movies, {id: movieWatched?.id, name: movieWatched?.name, watched: false}]);
      setWatchedMovies(watchedMovies.filter((m) => (m.id !== movieWatched?.id)));
    }
    else if (movieWatchlist)
    {
        setWatchedMovies([...watchedMovies, {id: movieWatchlist?.id, name: movieWatchlist?.name, watched: true}]);
        setMovies(movies.filter((m) => (m.id !== movieWatchlist?.id)));
    }
  };

  const moveMovie = (idSrc: number, idDst: number) => {
    if (idSrc === 0) return;

    let movieSrc = movies.find((m) => (m.id === idSrc));
    if (!movieSrc) movieSrc = watchedMovies.find((m) => (m.id === idSrc));

    let movieDst = movies.find((m) => (m.id === idDst));
    if (!movieDst) movieDst = watchedMovies.find((m) => (m.id === idDst));

    if (movieDst?.watched == movieSrc?.watched) return;

    if (movieSrc?.watched)
    {
      setMovies([...movies, {id: idSrc, name: movieSrc?.name, watched: false}]);
      setWatchedMovies(watchedMovies.filter((m) => (m.id !== idSrc)));
    }
    else if (movieSrc?.watched == false)
    {
      setWatchedMovies([...watchedMovies, {id: idSrc, name: movieSrc?.name, watched: true}]);
      setMovies(movies.filter((m) => (m.id !== idSrc)));
    }

  };


  useEffect(() => {
    const el = formRef.current;
    invariant(el);

    return combine(
      draggable({
        element: el,
        getInitialData: () => ({movie}),
        onDragStart: () => setDragging(true),
        onDrop: () => setDragging(false)
      }),
      dropTargetForElements({
        element: el, 
        getData: () => ({movie}),
        onDrop({source, self}) {
          let src = (source.data.movie as Movie).id;
          let dst = (self.data.movie as Movie).id;
          moveMovie(src, dst);
        }
      })
    )
    
    }, [movie]);


  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  
  return <form ref={formRef} className={((movie.id === 0) ? 'null-movie' : (dragging  ? 'movies__single opacity-50' : 'movies__single'))}  onSubmit={(e) => handleEdit(e, movie.id)}>
    {
      (movie.id === 0) ? 
      <div className='null-movie'></div>
      :
       edit ? (
        <input 
        ref={inputRef}
        value={editMovie} 
        onChange={(e) => setEditMovie(e.target.value)} 
        className="movies__single--text" />
      ) : (
          movie.watched ? (
            <i className="movies__single--text">
            {movie.name}
        </i>
          ) : (
            <b className="movies__single--text">
            {movie.name}
        </b>
          )
      )
    }
    {
      (movie.id === 0) ?  
      <div className='null-movie'></div>
      :
    <div>
        <span className="icon" onClick={()=> {
          if(!edit && !movie.watched){
            setEdit(!edit);
          }}
        }><FaEdit /></span>
        <span className="icon" onClick={() => handleDelete(movie.id)}><MdDelete /></span>
        <span className="icon" onClick={() => handleWatched(movie.id)}>
          {movie.watched ? <FaEyeSlash /> : <FaEye /> }
        </span>
    </div>
    }
  </form>;
}

export default SingleMovie
