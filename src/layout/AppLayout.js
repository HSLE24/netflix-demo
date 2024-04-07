import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const AppLayout = () => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate()

    const searchByKeyword=(event)=>{
        event.preventDefault();
        //url을 바꿔준다.
        navigate(`/movies?q=${keyword}`);
        setKeyword("");
    }

  return (
    <div>
        <Navbar expand="lg" className="bg-body-tertiary"  bg="dark" data-bs-theme="dark">
        <Container fluid>
            <Navbar.Brand><NavLink to="/"><img width="80px" alt="logo" src="https://images.ctfassets.net/y2ske730sjqp/821Wg4N9hJD8vs5FBcCGg/9eaf66123397cc61be14e40174123c40/Vector__3_.svg?w=460"/></NavLink></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <NavLink className="NavLink" to="/">Home</NavLink>
                <NavLink className="NavLink" to="/movies">Movies</NavLink>
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                />
                <Button variant="outline-danger" type="submit">Search</Button>
            </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        <Outlet></Outlet>
    </div>
  )
}

export default AppLayout