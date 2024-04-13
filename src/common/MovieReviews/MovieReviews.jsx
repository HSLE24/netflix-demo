import React from 'react'
import './MovieReviews.style.css'
import { useMovieReviewsQuery } from '../../hooks/useMovieReviews';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const MovieReviews = ({id}) => {

    const [expanded, setExpanded] = useState([]);

    const toggleExpand = (index) => {
      const newExpanded = [...expanded];
      newExpanded[index] = !newExpanded[index];
      setExpanded(newExpanded);
    };

    const {data, isLoading, isError, error} = useMovieReviewsQuery({id});
    console.log("MovieReviews ", data)
    
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
    <div className="container">
        {data.results.length != 0 &&
            (<h3 className="review-title">Reviews</h3>)
        }
        {data?.results.map((movie, index)=>(
            <div>
                <Card bg="dark" key={index} border="danger">
                    <Card.Body>
                        <h4 className="text-title">{movie.author} {movie.content.toLowerCase().includes("spoiler") ? <FontAwesomeIcon className="red-icon" icon={faCircleExclamation} /> : ""} </h4>
                        <Card.Text className={`${expanded[index] ? 'expanded' : 'text-box'}`}>
                            {movie.content}
                        </Card.Text>
                        {movie.content.split('\n').length > 5 && (
                            <button className="bg-dark more-btn" onClick={() => toggleExpand(index)}>
                            {expanded[index] ? '접기' : '더 보기'}
                            </button>
                        )}
                    </Card.Body>
                </Card>
                <br />
            </div>
        ))}
    </div>
  )
}

export default MovieReviews