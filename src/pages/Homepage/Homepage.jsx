import React from 'react'
import './Homepage.style.css'
import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/MovieSlide/PopularMovieSlide'
import TopRatedMovieSlide from './components/MovieSlide/TopRatedMovieSlide'
import UpcomingMovieSlide from './components/MovieSlide/UpcomingMovieSlide'

//1. 배너 => popular 영화를 들고와서 첫번째 아이템을 보여주자
//2. popular movie
//3. top rated movie
//4. upcoming movie
const Homepage = () => {
  return (
    <div className="App">
      <Banner />
      <PopularMovieSlide/>
      <TopRatedMovieSlide/>
      <UpcomingMovieSlide/>
      <div className='spacer'></div>
    </div>
  )
}

export default Homepage