import React from 'react';
import "./MovieSlider.style.css";
import Carousel from 'react-multi-carousel';
import Container from 'react-bootstrap/Container';
import MovieCard from '../MovieCard/MovieCard';
import 'react-multi-carousel/lib/styles.css';

const MovieSlider = ({title, movies, responsive}) => {

  return (
    <Container>
        <h3 className="section-title">{title}</h3>
        <Carousel
            infinite={true}
            centerMode={true}
            itemClass="movie-slider p-1"
            containerClass="carousel-container"
            responsive={responsive}
            >
            {movies.map((movie, index)=><MovieCard movie={movie} key={index}/>)}
        </Carousel>
    </Container>
  )
}

export default MovieSlider