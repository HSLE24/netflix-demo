import React from 'react'
import './MoviePage.style.css'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { Container, Row, Col } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import FilterComp from './components/FilterComp';

//경로 2가지
//nav바에서 클릭해서 온 경우 => popular movie 보여주기
//keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌

//페이지네이션 설치
//page state 만들기
//페이지네이션 클릭할 때마다 page 바꿔주기
//page 값이 바뀔 때 마다 useSearchMovie에 page까지 넣어서 fetch

const MoviePage = () => {

  const[query, setQuery] = useSearchParams()
  const keyword = query.get("q")

  const [page, setPage] = useState(1);

  const handlePageClick=({selected})=>{
    setPage(selected + 1);
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

  console.log("useSearchMovieQuery ", data);
  return (
    <Container>
      <div className="spacer"></div>
      <Row>
        <FilterComp/>
      </Row>
      <div className="spacer"></div>
      <Row>
        {data?.results.map((movie, index)=>(
          <Col key={index} lg={3} xs={6}>
            <MovieCard movie={movie}></MovieCard>
            <div className="spacer"></div>
          </Col>
        ))}
      </Row>
      <div className="pagination-area">
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
      </div>
    </Container>
  )
}

export default MoviePage