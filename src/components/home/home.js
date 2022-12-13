import React, { useEffect, useState } from "react";
import "./home.scss";
import { Container } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
// Services list.
import { getArticle, transformJsonGetUser } from "../../services/article.getServices";
import { deleteArticle } from "../../services/article.patchServices";

function Home({setAddShow, articles, setArticles, setEditShow, setArticleData}) {
  // Search Article state.
  const [searchArticle, setSearchArticle] = useState([]);
  // Rerendering the useState after deleting the item.
  const [reRender, setReRender] = useState(false);

  const [obj, setObj] = useState([]);

  useEffect(() => {
    if (reRender) {
      setReRender(false);
    }
    getArticle().then((res) => { //  Call the Article list service.
      if (res) {
        setObj(res);
        setArticles(res.data)
      }
    });
  }, [reRender, setArticles]);

  const currentUserName = JSON.parse(localStorage.getItem('username'));

  // Delete the item into the list.
  const deleteItem = (id) => {
    deleteArticle(id); // Call the delete service.
    setReRender(true); // Refresh the list after deleting the entity.
  }

  // Edit the selected item.
  const editItem = (val) => {
    setArticleData({
      id: val.id,
      title: val.attributes.title,
      desc: val.attributes.body.value
    });
    setEditShow(true);
  }

  // Handle change function for search.
  const handleChange = (e) => {
    var userInput = e.target.value;
    var count = 0;
    const lData = [];
    const data = articles;
    if (userInput !== "") {
      var regex = new RegExp(userInput, "i");
      {
        data.map((val) => {
          if (((val.attributes.title != null?val.attributes.title :"").search(regex) !== -1)) { // Regular expression: Sequence of character that specify a search pattern.
            const x = {
              "id": val.id,
              "type": val.type,
              "attributes":{
                "title": val.attributes.title,
                "body": val.attributes.body,
              },
              "relationships":{
                "uid": {
                  "data": {
                    "id": val.relationships.uid.data.id
                  }
                }
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

  // const x = searchArticle.length > 0 ? searchArticle : articles;
  const x = searchArticle.length > 0
  ?
    [...searchArticle].sort((a, b) =>
      a.name > b.name ? 1 : -1,
    )
  :
    [...articles].sort((a, b) =>
      a.name > b.name ? 1 : -1,
    );

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
            <div>
              <input type='text' placeholder="Search title" onChange={handleChange} />
            </div>
            <Button onClick={() => {setAddShow(true)}} className="brand-btn">
              Add Article
            </Button>
          </div>

          {x.length > 0 && (
            <div className="blog-list">
              {x.map((val, key) => {
                return ( transformJsonGetUser(obj,val?.relationships?.uid?.data?.id) === currentUserName ?
                  <div className="blog-item" key={val.id}>
                    <button className="delete-blog" onClick={() => {deleteItem(val.id)}}><FaTrash /></button>
                    <button onClick={() => {editItem(val)}} className="edit-blog"><FaEdit /></button>
                    {/* <div className="blog-img"><img src="https://i.pinimg.com/474x/af/62/06/af6206f25f1b5dab2f8d932edd0affd5--heart-of-gold-peacock-feathers.jpg" alt="" /></div> */}
                    <div className="blog-info">
                      <h2 className="blog-post-title">{`${val.attributes.title}`}</h2>
                      <div className="blog-description">
                        {val.attributes.body.value}
                      </div>
                      <div className="blog-author">
                        <strong>-
                          {transformJsonGetUser(obj,val?.relationships?.uid?.data?.id)}
                        </strong>
                      </div>
                    </div>
                  </div>
                :
                  <div className="blog-item" key={val.id}>
                    <div className="blog-info">
                      <h2 className="blog-post-title">{`${val.attributes.title}`}</h2>
                      <div className="blog-description">
                        {val.attributes.body.value}
                      </div>
                      <div className="blog-author">
                        <strong>-
                          {transformJsonGetUser(obj,val?.relationships?.uid?.data?.id)}
                        </strong>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Container>
      </section>
    </React.Fragment>
  )
}

export default Home;