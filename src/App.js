import React, { useEffect, useState } from 'react';
import './App.css';
import MovieBox from './MovieBox';
import { Container, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

function App() {
  const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=11286612ffe6921cae5e4a9394651277";
  const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=11286612ffe6921cae5e4a9394651277&language=en-US&page=1&include_adult=false";
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(data => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("Searching");
    try {
      const url = `${API_SEARCH}&query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  const changeHandler = (e) => {
    setQuery(e.target.value);
  }

  return (
    <>
      <Navbar bg='dark' expand="lg" variant='dark'  className="position-fixed top-0 start-0 w-100 z-10" style={{ zIndex: 50 }} >
        <Container fluid>
          <Navbar.Brand href='/home'>Movie App</Navbar.Brand>
         
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id='navbarScroll'>
            <Nav className="me-auto my-2 my-lg-3" style={{ maxHeight: "100px" }} navbarScroll />
            <Form className='d-flex' onSubmit={searchMovie}>
              <FormControl
                type='search'
                placeholder='Movie Search'
                className='me-2'
                aria-label="search"
                name='query'
                value={query}
                onChange={changeHandler}
              />
              <Button variant='secondary' type='submit'>Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {movies.length > 0 ? (
          <div className='container'>
            <div className='grid'>
              {movies.map((movieReq) => <MovieBox key={movieReq.id} {...movieReq} />)}
            </div>
          </div>
        ) : (
          <h2 className='text-white text-center'>Sorry, No Movies Found</h2>
        )}
      </div>
    </>
  );
}

export default App;
