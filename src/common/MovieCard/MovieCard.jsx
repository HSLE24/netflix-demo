import React from 'react'
import Badge from 'react-bootstrap/Badge';
import './MovieCard.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faChildren, faCheckToSlot, faTrophy } from '@fortawesome/free-solid-svg-icons';

const MovieCard = ({movie}) => {
  return (
    <div
    style={{backgroundImage:"url(" + `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}` + ")"}} 
    className="movie-card"
    >
        <div className="overlay">
            <div className="card-container">
                <h2 className="movie-title">{movie.title}</h2>
                {movie.genre_ids.map((id)=>(
                    <Badge pill bg="danger">
                        {id}
                    </Badge>
                ))}
            </div>
            <div className="card-container">
                <div><FontAwesomeIcon icon={faCheckToSlot} /> {movie.vote_average}</div>
                <div><FontAwesomeIcon icon={faTrophy} /> {movie.popularity}</div>
                <div>{movie.adult?(
                        <span className="ban"><FontAwesomeIcon icon={faBan} /> over 18</span>
                    ) : (
                        <span><FontAwesomeIcon icon={faChildren} /> under 18</span>
                    )}</div>
            </div>
        </div>
    </div>
  )
}

export default MovieCard