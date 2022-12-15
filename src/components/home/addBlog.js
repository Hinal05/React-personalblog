// Add Article modal.
import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// Services list.
import { createArticle } from '../../services/article.patchServices';
import { getArticle } from "../../services/article.getServices";

function AddBlog({handleClose, addShow, setAddShow, setArticles, articleData, setArticleData}) {
  const options = ['Tag1', 'Tag2', 'Tag3', 'Tag4'];
  const [tags, setTags] = useState(options[0]);
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
      console.log(articleData);
      let createArticleData = [];
      createArticleData = {
        title:articleData.title,
        body: articleData.description,
      };
      createArticle(createArticleData).then((res) => { // Call the Add Article service.
        if (res) {
          setAddShow(false);
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
          setAddShow(false);
          console.log('Res not Stored.');
        }
      });
    }
    event.preventDefault();
  }
  return (
    <section className="content-wrap">
      <Modal show={addShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Article</Modal.Title>
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
          <Autocomplete
            value={tags}
            name="tags"
            onChange={(event, newValue) => {
              setTags(newValue);
            }}
            id="controllable-states-demo"
            options={options}
            className="autocomplete-feilds"
            required
            renderInput={(params) => <TextField {...params} label="Tags" />}
          /> */}
          {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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