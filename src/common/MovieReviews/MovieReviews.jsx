import React from 'react'
import './MovieReviews.style.css'
import { useMovieReviewsQuery } from '../../hooks/useMovieReviews';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';

const MovieReviews = ({id}) => {

    const [expandedReviews, setExpandedReviews] = useState([]);

    const toggleExpand = (index) => {
        const newExpandedReviews = [...expandedReviews];
        newExpandedReviews[index] = !newExpandedReviews[index];
        setExpandedReviews(newExpandedReviews);
    };

    const renderContent = (content, index) => {
        if (expandedReviews[index] || content.split('\n').length <= 3) {
            return (
                <>
                    <Card.Text>{content}</Card.Text>    
                </>
            );
        } 
        else {
            return (
                <>
                    <Card.Text>{content.split('\n').slice(0, 3).join('\n')}</Card.Text>
                    <a onClick={() => toggleExpand(index)}>더 보기</a>
                </>
            );
        }
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
    <div>
        <h3>Reviews</h3>
        {data?.results.map((movie, index)=>(
            <div>
                <Card key={index} border="danger">
                    <Card.Body>
                    <Card.Title>{movie.author}</Card.Title>
                    {renderContent(movie.content, index)}
                    </Card.Body>
                </Card>
                <br />
            </div>
        ))}
    </div>
  )
}

export default MovieReviews