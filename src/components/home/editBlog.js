// Edit Article modal.
import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
// Services list.
import { editArticle } from '../../services/article.patchServices';
import { getArticle } from "../../services/article.getServices";

function EditBlog({handleEditClose, editShow, articleData, setArticleData, setArticles, setEditShow}) {
  // Input change event.
  const inputsHandler = (e) =>{
    const { name, value } = e.target;
    setArticleData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  // Button submit event.
  const handleSubmit = (event) => {
    if (articleData.length === 0) {
      console.log("Article can't be Empty.");
    } else {
      let createArticleData = [];
      createArticleData = {
        title:articleData.title,
        body:articleData.desc,
      };
      editArticle(createArticleData, articleData.id).then((res) => {
        if (res) {
          setEditShow(false);
          setArticleData({
            title: '',
            description: '',
          })
          // Refreshing the Article list as per the new data.
          getArticle().then((res) => { //  Call the Article list service.
            if (res) {
              setArticles(res.data)
            }
          });
        } else {
          setEditShow(false);
          console.log('Res not Stored.');
        }
      });
    }
    event.preventDefault();
  }
  return (
    <section className="content-wrap">
      <Modal show={editShow} onHide={handleEditClose} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="email" placeholder="Enter title" name="title" onChange={inputsHandler} value={articleData.title} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={6} placeholder="Enter Description" name="desc" onChange={inputsHandler} value={articleData.desc} />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Close
          </Button>
          <Button className="brand-btn" onClick={handleSubmit}>
            Save Post
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}

export default EditBlog;