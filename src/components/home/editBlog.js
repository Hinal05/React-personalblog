import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";
import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';

import { createArticle } from '../../services/article.patchServices';

function AddBlog({handleClose, show}) {

  const [articleData, setArticleData] = useState({
    title: '',
    description: '',
  });
  const inputsHandler = (e) =>{
    const { name, value } = e.target;
    setArticleData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  const handleSubmit = (event) => {
    if (articleData.length === 0) {
      console.log("Article can't be Empty.");
    } else {
      let createArticleData = [];
      createArticleData = {
        title:articleData.title,
        body: articleData.description,
      };
      createArticle(createArticleData).then((res) => {
        if (res) {
          console.log(res);
          setArticleData({
            title: '',
            description: '',
          })
        } else {
          console.log('Res not Stored.');
        }
      });
    }
    event.preventDefault();
  }
  return (
    <section className="content-wrap">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="email" placeholder="Enter title" name="title" onChange={inputsHandler} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter Description" name="description" onChange={inputsHandler} />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Author</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="Author1">Author1</option>
              <option value="Author2">Author2</option>
              <option value="Author3">Author3</option>
            </Form.Select>
          </Form.Group> */}
          {/* {['checkbox'].map((type) => (
            <div key={`default-${type}`} className="mb-3">
              <Form.Check
                type={type}
                id={`default-${type}`}
                label={`Agree`}
              />
            </div>
          ))} */}
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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

export default AddBlog;