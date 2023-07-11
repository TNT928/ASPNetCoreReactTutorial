import React, { useState } from "react";
import Constants from "../Utilities/Contants";

const PostUpdateForm = (props) => {
  const initialFormData = Object.freeze({
    title: props.post.title,
    content:
   props.post.content
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
    const postToUpdate = {
        postId:props.post.postId,
        title:formData.title,
        content:formData.content
    }

    const url = Constants.API_URL_UPDATE_POST

    fetch(url, {
        method: "PUT",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postToUpdate)
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

    props.onPostUpdated(postToUpdate)
  }

  return (

      <form className="w-100 px-5">
        <h1 className="mt-5">Update the post title {props.post.title}</h1>
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
          onClick={() => props.onPostUpdated(null)}
          className="btn btn-dark btn-lg w-100 mt-5"
        >
          Cancel
        </button>
      </form>
    
  );
};

export default PostUpdateForm;
