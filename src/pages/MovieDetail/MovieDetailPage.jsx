import React from 'react'
import './MovieDetailPage.style.css'
import { useParams } from 'react-router-dom'

const MovieDetailPage = () => {
  
  const params = useParams()
  console.log(params)
  
  return (
    <div className="App">
        <h1 className="temp-title">MovieDetailPage</h1>
    </div>
  )
}

export default MovieDetailPage