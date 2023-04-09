import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentForm, setCommentForm] = useState(false);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/posts/${id}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setPost(response.data.resultPost);
        setComments(response.data.resultComments);
        setCurrentUser(response.data.currentUser);
      });
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:8000/posts/:id/createComment",
      {
        message: message,
        user: currentUser._id,
        post: id,
      },
      { headers: { Authorization: token } }
    );
    window.location.reload();
  };

  const setVisibility = (e) => {
    e.preventDefault();
    setCommentForm(!commentForm);
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://localhost:8000/comment/delete`,
        { id: id },
        { headers: { Authorization: token } }
      )
      .then((result) => {
        window.location.reload();
      });
  };

  const handleCommentLikes = (id) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://localhost:8000/comment/like`,
        { id: id },
        { headers: { Authorization: token } }
      )
      .then((result) => {
        window.location.reload();
      });
  };

  const handlePostLikes = (id) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://localhost:8000/posts/like`,
        { id: id },
        { headers: { Authorization: token } }
      )
      .then((result) => {
        window.location.reload();
      });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {post ? (
        <div className="h-full w-full p-3">
          <div className="flex gap-8 items-center border-b-2 border-black p-2">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <div>
              {post.user.username} ( {post.user.first_name}{" "}
              {post.user.last_name} )
            </div>
            <div
              onClick={(e) => handlePostLikes(post._id)}
              className="border-2 border-black rounded-full p-1 cursor-pointer hover:bg-blue-500"
            >
              {post.likes} likes
            </div>
          </div>
          <div className="mt-2 ml-2">"{post.message}"</div>
        </div>
      ) : null}
      <h1 className="text-3xl font-bold border-b-2 border-black w-full p-3">
        Comments
      </h1>
      {comments && comments.length > 0 ? (
        comments.map((element) => {
          return (
            <div className="flex items-center gap-6 p-3 border-b-2 border-black w-full">
              <p className="text-2xl">"{element.message}"</p>
              <h6> - {element.user.username}</h6>
              <p
                onClick={(e) => handleCommentLikes(element._id)}
                className="border-2 border-black rounded-full p-1 cursor-pointer hover:bg-blue-500"
              >
                {element.likes} likes
              </p>
              {element.user._id === currentUser._id ? (
                <div>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(element._id)}
                    className=" border-2 border-black rounded-full p-1 text-sm bg-red-500 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
          );
        })
      ) : (
        <div> No Comments to Show...</div>
      )}
      {commentForm ? (
        <form
          onSubmit={handleCommentSubmit}
          className="mt-3 flex gap-4 items-center"
        >
          <label for="message">Message</label>
          <input
            name="message"
            id="message"
            onChange={(e) => setMessage(e.target.value)}
            className="border-2 border-black"
          ></input>
          <button
            type="submit"
            className="p-1 rounded-full border-2 border-black"
          >
            Submit
          </button>
        </form>
      ) : (
        <button
          type="submit"
          onClick={setVisibility}
          className="border-black border-b-2 mt-3 hover:text-violet-800"
        >
          Create a Comment
        </button>
      )}
    </div>
  );
};

export default Post;
