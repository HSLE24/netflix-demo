import React from 'react'
import './NotFoundPage.style.css'
import Button from 'react-bootstrap/Button';
import warning from '../../img/240406.JPG';
import { NavLink } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="main-area">
        <h1 className="main-info">We lost this page</h1>
        <NavLink className="NavLink" to="/"><Button variant="outline-danger">Return to Movie Selection</Button></NavLink>
        <img className="main-img" src={warning} alt="lost page img"></img>
    </div>
  )
}

export default NotFoundPage