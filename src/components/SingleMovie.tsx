import React, { useEffect, useRef, useState } from 'react'
import { Movie } from '../models/movie';
import {MdDelete} from "react-icons/md";
import {FaEdit, FaEye, FaEyeSlash} from "react-icons/fa"
import "./styles.css"


interface Props {
    movie: Movie;
    movies: Movie[];
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>
}

const SingleMovie: React.FC<Props> = ({movie, movies, setMovies}: Props) => {
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
    setMovies(movies.map((movie) => 
      movie.id === id ? {...movie, watched: !movie.watched} : movie))
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);
  
  return <form className="movies__single" onSubmit={(e) => handleEdit(e, movie.id)}>
    {
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
  </form>;
}

export default SingleMovie
