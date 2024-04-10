import React from 'react'
import './FilterComp.style.css'
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useMovieGenreQuery } from '../../../hooks/useMovieGenre'
import { useState } from 'react';

const FilterComp = () => {

    const dispatch = useDispatch();
    //const count = useSelector(state=>state.count)

    const {data:genreData} = useMovieGenreQuery();
    console.log(genreData);
  
    const [sortLabel, setSortLabel] = useState("정렬 순서");
    const [filterLabel, setFilterLabel] = useState("장르별 검색");
  
    const selectFilter=(sort, genreName, genreId)=>{

        if (sort === null){
            setSortLabel("정렬 기준")
            setFilterLabel(genreName)
        }
        else if (sort === "most"){
            setSortLabel("인기 많은 순")
            setFilterLabel("장르별 검색")
        }
        else if (sort === "least"){
            setSortLabel("인기 적은 순")
            setFilterLabel("장르별 검색")
        }
    
        dispatch({type: 'SELECT-FILTER', payload: {sort: sort, genreId: genreId}})
    }

  return (
    <div className="dropdown">
        <Dropdown className="d-inline mx-2" data-bs-theme="dark">
        <Dropdown.Toggle variant="danger" id="dropdown-autoclose-Danger">
            {sortLabel}
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item onClick={()=>selectFilter('most', null, null)}>인기 많은 순</Dropdown.Item>
        <Dropdown.Item onClick={()=>selectFilter('least', null, null)}>인기 적은 순</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="d-inline mx-2" data-bs-theme="dark">
        <Dropdown.Toggle variant="danger" id="dropdown-autoclose-Danger">
            {filterLabel}
        </Dropdown.Toggle>

        <Dropdown.Menu>
            {genreData?.map((genre)=>(
                <Dropdown.Item key={genre.id} onClick={()=>selectFilter(null, genre.name, genre.id)}>{ genre.name }</Dropdown.Item>
            ))}
        </Dropdown.Menu>
        </Dropdown>
    </div>
  )
}

export default FilterComp