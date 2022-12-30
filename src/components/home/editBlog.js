// Edit Article modal.
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// Services list.
import { editArticle } from '../../services/article.patchServices';
import { getArticle, getTags } from "../../services/article.getServices";
import jsonapi from "jsonapi-parse";

function EditBlog({handleEditClose, editShow, articleData, setArticleData, setArticles, setEditShow, tagsData, setTagsData}) {
  // Input change event.
  const [tags, setTags] = useState([]);
  useEffect(() => {
    var temp = [];
    getTags().then((res) => { //  Call the Tags list service.
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
      editArticle(createArticleData, articleData.id, tagData).then((res) => {
        if (res) {
          setEditShow(false);
          setArticleData({
            title: '',
            description: '',
          })
          // Refreshing the Article list as per the new data.
          getArticle().then((res) => { //  Call the Article list service.
            if (res) {
              setArticles(res.data);
              const apiData = jsonapi.parse(res);
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="image" onChange={inputsHandler} value={articleData.image} />
          </Form.Group>

          <Autocomplete
            multiple
            name="tags"
            inputValue={(tagsData).map((item, index) => {
              return item.name;
            })}
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