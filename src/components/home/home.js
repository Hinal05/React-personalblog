import React, { useEffect, useState } from "react";
import "./home.scss";
import { Container } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import { getArticle } from "../../services/article.getServices";
import { deleteArticle } from "../../services/article.patchServices";

function Home({handleShow}) {

  const [articles, setArticles] = useState([]);
  const [searchArticle, setSearchArticle] = useState([]);
  const [reRender, setReRender] = useState(false);

  useEffect(() => {
    if (reRender) {
      setReRender(false);
    }

    getArticle().then((res) => {
      if (res) {
        setArticles(res.data)
      }
    });
  }, [reRender]);


  const deleteItem = (id) => {
    deleteArticle(id);
    setReRender(true);
  }

  const handleChange = (e) => {
    var userInput = e.target.value;
    var count = 0;
    const lData = [];
    const data = articles;
    if (userInput !== "") {
      var regex = new RegExp(userInput, "i");
      {
        data.map((val) => {
          if (((val.attributes.title != null?val.attributes.title :"").search(regex) !== -1)) {
            const x = {
              "id": val.id,
              "type": val.type,
              "attributes":{
                "title": val.attributes.title,
                "body": val.attributes.body
              }
            }
            lData.push(x);
            count++;
          }
        })
      }
      setSearchArticle(lData);
    }
  }

  const x = searchArticle.length > 0 ? searchArticle : articles;
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
            <input type='text' placeholder="Search title" onChange={handleChange} />
            <Button onClick={handleShow} className="brand-btn">
              Add Post
            </Button>
          </div>

          {x.length > 0 && (
            <div className="blog-list">
              {x.map((val, key) => (
                <div className="blog-item" key={val.id}>
                  <button className="delete-blog" onClick={() => {deleteItem(val.id)}}><FaTrash /></button>
                  <button onClick={handleShow} className="edit-blog"><FaEdit /></button>
                  <div className="blog-info">
                    <h2 className="blog-post-title">{`${val.attributes.title}`}</h2>
                  </div>
                  <div className="blog-description">
                    {val.attributes.body.value}
                  </div>
                  {/* <div className="blog-date">
                    <strong>- {article.blog_author}</strong>
                  </div> */}
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </React.Fragment>
  )
}

export default Home;