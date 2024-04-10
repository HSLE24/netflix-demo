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
        <Row className="detail-container">
            <Col lg={3} xs={12}>
                <img className="detail-img" src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.backdrop_path}`}></img>
            </Col>
            <Col lg={9} xs={12}>
                <div>
                    <h4>{movie.title}</h4>
                    <p></p>
                </div>
                <div>
                    {showGenre(movie.genres).map((genre)=>(
                        <Badge key={genre} pill bg="danger">
                            {genre}
                        </Badge>
                    ))}
                </div>
                <div>
                    <div><FontAwesomeIcon icon={faCheckToSlot} /> {movie.vote_average}</div>
                    <div><FontAwesomeIcon icon={faTrophy} /> {movie.popularity}</div>
                    <div>{movie.adult?(
                            <span className="ban"><FontAwesomeIcon icon={faBan} /> over 18</span>
                        ) : (
                            <span><FontAwesomeIcon icon={faChildren} /> under 18</span>
                        )}</div>
                </div>
            </Col>
        </Row>
    </Container>
  )
}

export default MovieDetail