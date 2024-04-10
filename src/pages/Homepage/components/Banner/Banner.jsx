import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import './Banner.style.css'
import Carousel from 'react-bootstrap/Carousel';

const Banner = () => {

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
    // <div style={{
    //     backgroundImage:"url(" + `https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data.results[2].backdrop_path}` + ")"
    // }}
    // className="banner">
    //     <div className="text-white banner-text-area">
    //         <h1>{data?.results[2].title}</h1>
    //         <p>{data?.results[2].overview}</p>
    //     </div>
    // </div>
    <Carousel>
      <Carousel.Item>
        <div className="gradient-overlay">
            <img
                className="d-block w-100"
                src={`https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data.results[0].backdrop_path}`}
                alt="First slide"
                />
        </div>
        <Carousel.Caption>
          <h1>{data?.results[0].title}</h1>
          <p className="overview">{data?.results[0].overview}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="gradient-overlay">
            <img
                className="d-block w-100"
                src={`https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data.results[1].backdrop_path}`}
                alt="Second slide"
                />
        </div>
        <Carousel.Caption>
          <h1>{data?.results[1].title}</h1>
          <p className="overview">{data?.results[1].overview}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="gradient-overlay">
            <img
                className="d-block w-100"
                src={`https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data.results[2].backdrop_path}`}
                alt="Third slide"
                />
        </div>
        <Carousel.Caption>
          <h1>{data?.results[2].title}</h1>
          <p className="overview">{data?.results[2].overview}</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default Banner