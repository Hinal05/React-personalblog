import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, NavLink, Routes } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap';

// Import Components.
import Home from "./components/home/home";
import NotFound from "./components/notfound/notFound";
import AddBlog from "./components/home/addBlog";
import EditBlog from "./components/home/editBlog";
import Login from "./components/login/login";
import ContactUs from "./components/contact/contact";

function App() {
  // Modal states.
  const [addShow, setAddShow] = useState(false);
  const handleClose = () => setAddShow(false);
  const [editShow, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);

  // List of Articles.
  const [articles, setArticles] = useState([]);
  // Selected Article.
  const [articleData, setArticleData] = useState({
    id: '',
    title: '',
    description: '',
  });

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
                {/* <NavLink to="/contact" className="nav-link">ContactUs</NavLink> */}
                <NavLink to="/login" className="nav-link">Sign In</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home setAddShow={setAddShow} setArticles={setArticles} articles={articles} setEditShow={setEditShow} editShow={editShow} setArticleData={setArticleData} />} />
          <Route path="*" element={<NotFound/>} />
          <Route path="/contact" exact element={<ContactUs/>} />
          <Route path='/login' exact element={<Login />} />
        </Routes>
      </Router>

      {/* Modal */}
      <AddBlog handleClose={handleClose} addShow={addShow} setAddShow={setAddShow} setArticles={setArticles} setArticleData={setArticleData} articleData={articleData} />
      <EditBlog handleEditClose={handleEditClose} editShow={editShow} setEditShow={setEditShow} setArticles={setArticles} setArticleData={setArticleData} articleData={articleData} />
    </section>
  )
}

export default App;