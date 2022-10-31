import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';

import { getLocalStorage } from "./services/helper-functions";

import Home from "./components/home/home";
import NotFound from "./components/notfound/notFound";
import AddBlog from "./components/home/addBlog";
import Login from "./components/login/login";
import ContactUs from "./components/contact/contact";

import { getAuthClient } from '../src/components/services/auth';

const auth = getAuthClient();

function App() {

  const [result, setResult] = useState({
    success: null,
    error: null,
    message: '',
  });

  const defaultValues = {name: '', pass: ''};
  const [loginValues, setLoginValues] = useState(defaultValues);

  // Only need to do this on first mount.
  useEffect(() => {
    auth.isLoggedIn().then((res) => {
      setLoggedIn(true);
    })
  }, []);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  // Only need to do this on first mount.
  useEffect(() => {
    auth.isLoggedIn().then((res) => {
      setLoggedIn(true);
    })
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section className="content-wrap">
       <Router>
        <Navbar expand="lg" fixed="top">
          <Container>
            <Navbar.Brand href="#">CUSTOM POST</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" className="justify-content-end">
              <Nav
              className="my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
              >
                <NavLink to="/" className="nav-link">Home</NavLink>
                <NavLink to="/contact" className="nav-link">ContactUs</NavLink>
                {/* <NavLink to="/addBlog" className="nav-link hightlight">Add Blog</NavLink> */}
                {!isLoggedIn ?
                  <NavLink to="/login" className="nav-link">Sign In</NavLink> :
                <>
                  {/* <NavLink to="/addBlog">Create Post</NavLink> */}
                  <NavLink to="/login" className="nav-link highlight" onClick={() => auth.logout().then(setLoggedIn(false))}>Logout</NavLink>
                </>
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          {/* <Route path="/addBlog" exact element={<AddBlog/>} /> */}
          <Route path="/" exact element={<Home setShow={setShow} handleShow={handleShow} isLoggedIn={isLoggedIn} result={result} />} />
          <Route path="*" element={<NotFound/>} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path='/login' element={<Login auth={auth} setLoginValues={setLoginValues} loginValues={loginValues} setResult={setResult} result={result} setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} setSubmitting={setSubmitting} isSubmitting={isSubmitting} />} />
        </Routes>
      </Router>

      <AddBlog handleClose={handleClose} show={show} />
    </section>
  )
}

export default App;