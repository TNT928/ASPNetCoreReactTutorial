import React, { useState } from "react";
import Constants from "../Utilities/Contants";

const PostCreateForm = (props) => {
  const initialFormData = Object.freeze({
    title: "Post X",
    content:
      "This is post x and it is about how I didn't like or subscribe to the channel",
  });

  const [formData, setFormData] = useState(initialFormData);



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) =>{
    e.preventDefault()
    const postToCreate = {
        postId:0,
        title:formData.title,
        content:formData.content
    }

    const url = Constants.API_URL_CREATE_POST

    fetch(url, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postToCreate)
      })
        .then((response) => response.json())
        .then((responseFromServer) => {
          console.log(responseFromServer);
        //   setPosts(postsFromServer);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });

    props.onPostCreated(postToCreate)
  }

  return (

      <form className="w-100 px-5">
        <h1 className="mt-5">Create New Post</h1>
        <div className="mt-5">
          <label className="h3 form-label">Post Title</label>
          <input
            value={formData.title}
            type="text"
            className="form-control"
            onChange={handleChange}
            name="title"
          />
        </div>
        <div className="mt-4">
          <label className="h3 form-label">Post Content</label>
          <input
            value={formData.content}
            type="text"
            className="form-control"
            name="content"
            onChange={handleChange}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-dark btn-lg w-100 mt-5"
        >
          Submit
        </button>
        <button
          onClick={() => props.onPostCreated(null)}
          className="btn btn-dark btn-lg w-100 mt-5"
        >
          Cancel
        </button>
      </form>
    
  );
};

export default PostCreateForm;
