import React, { useState } from "react";
import "./home.scss";
import { Container } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import data from '../../data';
import Button from 'react-bootstrap/Button';

function Home({setShow, handleShow}) {

  const [query, setQuery] = useState("");

  return (
    <React.Fragment>
      <section className="blog-list-wrapper">
        <div className="header">
          <Container>
            <h1>Blogs</h1>
          </Container>
        </div>
        <Container>
          <div className="filter-wrapper">
            <input type='text' placeholder="Search title" onChange={(e) => setQuery(e.target.value)} />
            <Button onClick={handleShow} className="brand-btn">
              Add Post
            </Button>
          </div>

          <div className="blog-list">
            {data && data.filter((item)=>item.blog_title.includes(query)).map(el => {
              return (
                <div className="blog-item" key={el.id}>
                  <a href="" className="delete-blog"><FaTrash /></a>
                  <a href="#" className="blog-info">
                    {/* <div className="blog-img">
                        <img src={el.blog_image} alt={el.blog_title} className="img-fluid" />
                    </div> */}
                    {/* <span className="blog-new-badge">New</span> */}
                    <h2 className="blog-post-title">{el.blog_title}</h2>
                  </a>
                  <div className="blog-description">
                    <p>{el.blog_description}</p>
                  </div>
                  <div className="blog-date">
                    <strong>- {el.blog_author}</strong>
                    {/* <span>{el.blog_date}</span> */}
                  </div>
                  {/* <hr/>
                  <div className="blog-extra-detail">
                    <span>36 comments</span>
                  </div> */}
                </div>
              )
            })}
          </div>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default Home;