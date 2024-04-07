import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import './FilterComp.style.css'
import { useMovieGenreQuery } from '../../../hooks/useMovieGenre';

const FilterComp = () => {

    const {data:genreData} = useMovieGenreQuery();
    console.log(genreData);

  return (
    <div className="dropdown">
        <Dropdown className="d-inline mx-2" data-bs-theme="dark">
        <Dropdown.Toggle variant="danger" id="dropdown-autoclose-Danger">
            정렬 기준
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="#">인기 많은순</Dropdown.Item>
            <Dropdown.Item href="#">인기 적은순</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="d-inline mx-2" data-bs-theme="dark">
        <Dropdown.Toggle variant="danger" id="dropdown-autoclose-Danger">
            장르별 검색
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
            {genreData?.map((genre)=>(
                <Dropdown.Item href="#">{ genre.name }</Dropdown.Item>
            ))}
        </Dropdown.Menu>
        </Dropdown>
    </div>
  )
}

export default FilterComp