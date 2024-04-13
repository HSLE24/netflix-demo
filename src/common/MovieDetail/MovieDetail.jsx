import React from 'react'
import './MovieDetail.style.css'
import { Container, Row, Col } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faChildren, faCheckToSlot, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

const MovieDetail = ({movie}) => {

    const {data:genreData} = useMovieGenreQuery();
    console.log(movie);

    const showGenre=(genreIdList)=>{

        if (!genreData) return []
        const genreNameList = genreIdList.map((data)=>{
            const genreObj = genreData.find((genre)=>genre.id === data.id)
            return genreObj.name
        })

        return genreNameList;
    }

  return (
    <Container>
        <Row>
            <Col className="d-flex justify-content-center mt-5 col-lg-6 col-12">
                <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}></img>
            </Col>
            <Col className="mt-5 col-lg-6 col-12">
                <div className="d-flex mb-4">
                    {showGenre(movie.genres).map((genre)=>(
                        <Badge key={genre} pill bg="danger">
                            {genre}
                        </Badge>
                    ))}
                </div>
                <div>
                    <h1>{movie.title}</h1>
                    <h3>{movie.tagline}</h3>
                </div>
                <div className="py-4 border-bottom border-white">
                    <div><FontAwesomeIcon className="icon-color" icon={faCheckToSlot} /> {movie.vote_average}  <FontAwesomeIcon className="icon-color"  icon={faTrophy} /> {movie.popularity} {movie.adult?(
                            <span className="ban"><FontAwesomeIcon className="icon-color"  icon={faBan} /> over 18</span>
                        ) : (
                            <span><FontAwesomeIcon className="icon-color"  icon={faChildren} /> under 18</span>
                        )}</div>
                </div>
                <div className="py-4 border-bottom border-white">
                    <p className="overview-text">{movie.overview}</p>
                </div>
                <div className="py-4">
                    <div><Badge pill bg="danger">
                        budget</Badge> $ {movie.budget}</div>
                    <div><Badge pill bg="danger">revenue</Badge> $ {movie.revenue}</div>
                    <div><Badge pill bg="danger">release date</Badge> {movie.release_date}</div>
                    <div><Badge pill bg="danger">runtime</Badge> {movie.runtime} minutes</div>
                </div>
            </Col>
        </Row>
    </Container>
  )
}

export default MovieDetail