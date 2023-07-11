import React, { useState } from "react";
import Constants from "./Utilities/Contants";
import PostCreateForm from "./Components/PostCreateForm";
import PostUpdateForm from "./Components/PostUpdateForm";

function App() {
  const [posts, setPosts] = useState([]);
  const [showingCreateNewPostForm, setShowingCreateNewPostForm] =
    useState(false);
  const [postbeingUpdated, setPostBeingUpdated] = useState(null);
  const getPosts = () => {
    const url = Constants.API_URL_GET_ALL_POSTS;

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((postsFromServer) => {
        console.log(postsFromServer);
        setPosts(postsFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };


  const deletePost = (postId) =>{
    const url = `${Constants.API_URL_DELETE_POST_BY_ID}/${postId}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
       onPostDelete(postId)
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  const renderPostsTable = () => {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">PostId (PK)</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">CRUD Operations</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.postId}>
                <th scope="row">{post.postId}</th>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  <button className="btn btn-dark btn-lg mx-3 my-3" onClick={() => setPostBeingUpdated(post) }>
                    Update
                  </button>
                  <button className="btn btn-secondary btn-lg" onClick={() => {if(window.confirm(`Are you sure you want to delete the post titled ${post.title}?`)) deletePost(post.postId)} }>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={() => setPosts([])}
          className="btn btn-dark btn-lg w-100"
        >
          Empty React posts array
        </button>
      </div>
    );
  };

  const onPostCreated = (createdPost) => {
    setShowingCreateNewPostForm(false);
    if (createdPost === null) {
      return;
    }
    alert(
      `Post successfully create after click ok. Your new ${createdPost.title} will show up in the table below`
    );
    getPosts();
  };

  const onPostDelete = (deletedPostId) => {
    
    let postCopy = [...posts];
    const index = postCopy.findIndex((copiedPost, postIndex) => {
      if (copiedPost.postId === deletedPostId) {
        return true;
      }
    });
    if (index !== -1) {
      postCopy.splice(index, 1)
    }

 setPosts(postCopy);

alert(
    "Post deleted"
    );

   

    
  };
  const onPostUpdate = (updatedPost) => {
    setPostBeingUpdated(null);
    if (updatedPost === null) {
      return;
    }
    let postCopy = [...posts];
    const index = postCopy.findIndex((copiedPost, postIndex) => {
      if (copiedPost.postId === updatedPost.postId) {
        return true;
      }
    });
    if (index !== -1) {
      postCopy[index] = updatedPost;
    }

    setPosts(postCopy);

    alert(
      `Post successfuly updated.Your post titled ${updatedPost.title} will show up in the table below `
    );
  };

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <h1>ASP.Net Core React Tutorial</h1>
          {showingCreateNewPostForm === false && postbeingUpdated === null && (
            <div className="mt-5">
              <button onClick={getPosts} className="btn btn-dark btn-lg w-100">
                Get Posts
              </button>
              <button
                onClick={() => setShowingCreateNewPostForm(true)}
                className="btn btn-secondary btn-lg w-100 mt-4"
              >
                Create New Post
              </button>
            </div>
          )}
          {posts.length > 0 &&
            showingCreateNewPostForm === false && postbeingUpdated === null &&
            renderPostsTable()}
          {showingCreateNewPostForm && (
            <PostCreateForm onPostCreated={onPostCreated} />
          )}
          {postbeingUpdated !== null && (
            <PostUpdateForm post={postbeingUpdated} onPostUpdated = {onPostUpdate}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
