import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';

const PopularMovieSlide = () => {

   const { data, isLoading, isError, error } = usePopularMoviesQuery()

   if (isLoading){
       return (
        <div className="spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
         );
   }
   if (isError){
       return <Alert variant='danger'>{ error.message }</Alert>
   }

  return (
    <div>
        <MovieSlider title="Popular Movies" movies={data.results} responsive={responsive}/>
    </div>
  )
}

export default PopularMovieSlide