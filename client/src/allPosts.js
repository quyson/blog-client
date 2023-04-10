import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Posts = () => {
  const [postList, setPostList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .get("http://localhost:8000/posts", { headers: { Authorization: token } })
      .then((response) => {
        setPostList(response.data.result);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/getCurrentUser", {
        headers: { Authorization: token },
      })
      .then((response) => {
        setCurrentUser(response.data.currentUser._id);
      });
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8000/posts/${id}`, {
        headers: { Authorization: token },
      })
      .then((result) => {
        window.location.reload();
      });
  };

  return (
    <div className="flex flex-col items-center">
      {currentUser === null ? null : (
        <a
          href="/posts/create"
          className="p-2 self-start my-3 mx-3 text-white bg-blue-500 rounded-full border-2 border-black text-sm hover:bg-blue-800"
        >
          Create a New Post
        </a>
      )}
      <h1 className="border-b-2 border-b-black w-full text-3xl font-bold">
        All Posts
      </h1>
      <div className="self-start grid grid-cols-3 auto-rows-auto gap-1 h-full">
        {postList.map((element) => {
          return (
            <div className="border-2 border-black p-3 bg-blue-200 hover:bg-yellow-200">
              <div className="flex gap-4 items-center">
                <Link to={`/posts/${element._id}`}>
                  <h2 className="text-xl font-bold hover:text-violet-700 ">
                    {element.title}
                  </h2>
                </Link>
                <Link to={`/users/${element.user._id}`}>
                  <p className="hover:text-violet-700">
                    - {element.user.username}
                  </p>
                </Link>
                <p className="text-xs">{element.createdAt.slice(0, 9)}</p>
                {element.user._id == currentUser ? (
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
              <p>{element.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
