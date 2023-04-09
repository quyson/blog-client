import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/posts/create`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setUserId(response.data.user._id);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    await axios.post(
      "http://localhost:8000/posts/create",
      {
        title: title,
        message: message,
        user: userId,
      },
      { headers: { Authorization: token } }
    );
    setNavigate(true);
  };

  if (navigate) {
    return <Navigate to={"/posts"} />;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-4 mt-5 justify-center items-center h-full"
      >
        <label for="title">Title</label>
        <input
          name="title"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-black"
        ></input>
        <label for="message">Message</label>
        <input
          name="message"
          id="message"
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 border-black"
        ></input>
        <button
          type="submit"
          className="p-2 rounded-full border-2 border-black bg-blue-600 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
