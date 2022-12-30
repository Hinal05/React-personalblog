// Add Article modal.
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// Services list.
import { createArticle } from '../../services/article.patchServices';
import { getArticle, getTags } from "../../services/article.getServices";

function AddBlog({handleClose, addShow, setAddShow, setArticles, articleData, setArticleData, tagsData, setTagsData, imageData, setImageData}) {
  // Input change event.
  const [tags, setTags] = useState([]);
  let fileInput = React.useRef();
  useEffect(() => {
    getTags().then((res) => { //  Call the Article list service.
      if (res) {
        setTags(res.data);
      }
    });
  }, [setTags]);

  const inputsHandler = (e) =>{
    const { name, value } = e.target;
    setArticleData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  let tagData = [];
  let tData = tagsData;
  for (var a = 0; a < tData.length; a++) {
    var id2 = tData[a].id;
    var type = "taxonomy_term--tags";
    tagData.push({ type: type, id: id2 });
  }

  const getImage = (event) => {
    console.log(event.target.files[0])
  }

  // Button submit event.
  const handleSubmit = (event) => {
    console.log(tagData, 'tagData');
    if (articleData.length === 0) {
      console.log("Article can't be Empty.");
    } else {
      let createArticleData = [];
      createArticleData = {
        title:articleData.title,
        body: articleData.description,
      };
      console.log(imageData);
      // let image_url = [];
      // image_url = {
      //   field_image: {
      //     data: {
      //       "href": articleData.image
      //     }
      //   }
      // };
      createArticle(createArticleData, tagData).then((res) => { // Call the Add Article service.
        if (res) {
          setAddShow(false);
          setArticleData({
            title: '',
            description: '',
            image: '',
          })
          // Refreshing the Article list as per the new data.
          getArticle().then((res) => { //  Call the Article list service.
            console.log(res, 'res');
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image</Form.Label>
            <Form.Control id="fileInput" type="file" name="image" ref={fileInput} accept="image/png,image/jpg,image/jpeg" onChange={getImage} />
          </Form.Group>
          <Autocomplete
            multiple
            name="tags"
            onChange={(event, value) => {
              setTagsData(value);
            }}
            id="controllable-states-demo"
            options={tags}
            getOptionLabel={(option) => option?.attributes?.name || ""}
            getOptionSelected={(option, value) => option.id === value.id}
            className="autocomplete-feilds"
            required
            renderInput={(params) => <TextField {...params} variant="filled" label="Tags" placeholder="Tags" />}
          />
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