import React from 'react'
import './MoviePage.style.css'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { Container, Row, Col } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';
import FilterComp from './components/FilterComp';
import { useSelector, useDispatch } from 'react-redux';

//경로 2가지
//nav바에서 클릭해서 온 경우 => popular movie 보여주기
//keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌

//페이지네이션 설치
//page state 만들기
//페이지네이션 클릭할 때마다 page 바꿔주기
//page 값이 바뀔 때 마다 useSearchMovie에 page까지 넣어서 fetch

const MoviePage = () => {

  const MobileReactPaginate = () => (
    <ReactPaginate
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      marginPagesDisplayed={1}
      pageCount={data?.total_pages}
      previousLabel="< prev"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
      forcePage={page - 1}
    />
  );
  
  const PcReactPaginate = () => (
    <ReactPaginate
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={data?.total_pages}
      previousLabel="< prev"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
      forcePage={page - 1}
    />
  );
  
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

  const[query, setQuery] = useSearchParams()
  const keyword = query.get("q")

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  let genre = useSelector((state)=>state.genreId)
  let sort = useSelector((state)=>state.sort)

  useEffect(() => {
    dispatch({ type: 'SELECT-FILTER', payload: { sort: null, genreId: null } });
  }, []); // 페이지 로드시에만 실행

  const handlePageClick=({selected})=>{
    setPage(selected + 1);
    dispatch({type: 'SELECT-FILTER', payload: {sort: null, genreId: null}})
  }

  const {data, isLoading, isError, error} = useSearchMovieQuery({keyword, page});

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
  
  const filterMoviesByGenre = (movies, genreId) => {
    if (genreId === null) {
      return movies; // 필터링할 장르가 없으면 모든 영화를 반환
    }
    return movies.filter(movie => movie.genre_ids.includes(genreId));
  };

  return (
    <Container>
      <div className="spacer"></div>
      <Row>
        <FilterComp/>
      </Row>
      <div className="spacer"></div>
      <Row>
        {filterMoviesByGenre(data?.results, genre)
        .sort((a, b) => {
          if (sort === "most"){
            return b.popularity - a.popularity;
          }
          else if (sort === "least"){
            return a.popularity - b.popularity;
          }
          return 0;
        })
        .map((movie, index)=>(
          <Col key={index} lg={3} md={4} sm={6} xs={12} className="img-center">
            <MovieCard movie={movie}></MovieCard>
          </Col>
        ))}
      </Row>
      <div className="pagination-area">
        {isMobile ? (
          <MobileReactPaginate/>
        ) : (
          <PcReactPaginate/>
        )}
      </div>
    </Container>
  )
}

export default MoviePage