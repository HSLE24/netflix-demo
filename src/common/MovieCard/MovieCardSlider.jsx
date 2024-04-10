import React from 'react'
import Badge from 'react-bootstrap/Badge';
import './MovieCardSlider.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faChildren, faCheckToSlot, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useNavigate } from 'react-router-dom';

const MovieCardSlider = ({movie}) => {

    const navigate = useNavigate();

    const {data:genreData} = useMovieGenreQuery();
    const showGenre=(genreIdList)=>{
        if (!genreData) return []
        const genreNameList = genreIdList.map((id)=>{
            const genreObj = genreData.find((genre)=>genre.id === id)
            return genreObj.name
        })

        return genreNameList;
    }

    const handleMovieClick = () => {
        navigate(`/movies/${movie.id}`);
    };

  return (
    <div
    style={{backgroundImage:"url(" + `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}` + ")"}} 
    className="movie-card-slider"
    onClick={handleMovieClick}
    >
        <div className="overlay-slider">
            <div className="card-container-slider">
                <h4 className="movie-title-slider">{movie.title}</h4>
                {showGenre(movie.genre_ids).map((id)=>(
                    <Badge key={id} pill bg="danger">
                        {id}
                    </Badge>
                ))}
            </div>
            <div className="card-container-slider">
                <div><FontAwesomeIcon icon={faCheckToSlot} /> {movie.vote_average}</div>
                <div><FontAwesomeIcon icon={faTrophy} /> {movie.popularity}</div>
                <div>{movie.adult?(
                        <span className="ban-slider"><FontAwesomeIcon icon={faBan} /> over 18</span>
                    ) : (
                        <span><FontAwesomeIcon icon={faChildren} /> under 18</span>
                    )}</div>
            </div>
        </div>
    </div>
  )
}

export default MovieCardSlider