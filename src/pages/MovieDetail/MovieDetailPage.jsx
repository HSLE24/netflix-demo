import React from 'react'
import './MovieDetailPage.style.css'
import { useParams } from 'react-router-dom'
import DetailBanner from '../Homepage/components/Banner/DetailBanner'
import { useMovieDetailQuery } from '../../hooks/useMovieDetail'
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import MovieDetail from '../../common/MovieDetail/MovieDetail'
import MovieReviews from '../../common/MovieReviews/MovieReviews'
import MovieSlider from '../../common/MovieSlider/MovieSlider'
import { useRelatedMoviesQuery } from '../../hooks/useRelatedMovies'
import { responsive } from '../../constants/responsive';

const MovieDetailPage = () => {
  
  const params = useParams()
  const { data, isLoading, isError, error } = useMovieDetailQuery({id: params.id})
  const { data:relatedData } = useRelatedMoviesQuery({id: params.id})
  console.log("relatedData ", relatedData)
  
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
      <DetailBanner backdrop_path={data.backdrop_path} title={data.title} overview={data.overview} id={params.id}/>
      <div className='spacer'></div>
      <MovieDetail movie={data}/>
      <div className='spacer'></div>
      <MovieSlider title="Related Movies" movies={relatedData.results} responsive={responsive}/>
      <div className='spacer'></div>
      <MovieReviews id={params.id}/>
      <div className='spacer'></div>
    </div>
  )
}

export default MovieDetailPage