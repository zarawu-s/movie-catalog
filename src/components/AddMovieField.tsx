import React, { FormEvent, useRef } from 'react'
import "./styles.css"

interface Props {
    movie: string;
    setMovie: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const AddMovieField: React.FC<Props> = ({movie, setMovie, handleAdd}: Props) => {
const inputRef = useRef<HTMLInputElement>(null);

  return <form className="input" 
                onSubmit={(e) => {
                    handleAdd(e);
                    inputRef.current?.blur();
                    }}>
    <input ref={inputRef} type="input" value={movie} onChange={(e) => setMovie(e.target.value)} placeholder="Enter movie name" className="input__box"/>
    <button className="input__submit" type="submit">
        Add
    </button>
  </form>;
}

export default AddMovieField
