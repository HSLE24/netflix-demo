import React from 'react';
import "./MovieSlider.style.css";
import Carousel from 'react-multi-carousel';
import Container from 'react-bootstrap/Container';
import MovieCardSlider from '../MovieCard/MovieCardSlider';
import 'react-multi-carousel/lib/styles.css';
import { useState, useEffect } from 'react';

const MovieSlider = ({title, movies, responsive}) => {
  
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
  return (
    <Container>
        <h3 className="section-title">{title}</h3>
        <Carousel
                responsive={responsive}
                autoPlay={true}
                itemClass="movie-slider p-1"
                containerClass="carousel-container"
                infinite={true}
                centerMode={!isMobile}
            >
            {movies?.map((movie, index)=><MovieCardSlider movie={movie} key={index}/>)}
        </Carousel>
    </Container>
  )
}

export default MovieSlider