import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../../../../common/MovieCard/MovieCard';
import './PopularMovieSlide.style.css';
import Container from 'react-bootstrap/Container';

const PopularMovieSlide = () => {

   const { data, isLoading, isError, error } = usePopularMoviesQuery()

   if (isLoading){
       return (
           <Spinner animation="border" role="status">
             <span className="visually-hidden">Loading...</span>
           </Spinner>
         );
   }
   if (isError){
       return <Alert variant='danger'>{ error.message }</Alert>
   }

   const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        }
    };
  return (
    <Container>
        <h3 className="section-title">Popular Movies</h3>
        <Carousel
            infinite={true}
            centerMode={true}
            itemClass="movie-slider p-1"
            containerClass="carousel-container"
            responsive={responsive}
            >
            {data.results.map((movie, index)=><MovieCard movie={movie} key={index}/>)}
        </Carousel>
    </Container>
  )
}

export default PopularMovieSlide