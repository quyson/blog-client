import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/users/${id}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setUser(response.data.resultUser);
        setPosts(response.data.resultPost);
        setCurrentUser(response.data.currentUser);
      });
  }, []);

  return (
    <div>
      <div>
        {user ? (
          <div className="flex flex-col items-start p-3 mt-3 gap-4">
            <h1 className="text-3xl font-bold border-b-2 border-black w-full">
              {user.username}
            </h1>
            <div className="text-xl font-bold">
              {user.first_name + " " + user.last_name}
            </div>
            <div>"{user.bio}"</div>
          </div>
        ) : null}
      </div>
      <h1 className="p-3 mb-3 text-3xl font-bold border-b-2 border-black">
        Posts
      </h1>
      {posts && posts.length > 0 ? (
        posts.map((element) => {
          return (
            <div className="p-3 border-b-2 border-black">
              <div className="flex gap-4 items-center">
                <a href={`/posts/${element._id}`}>
                  <h6 className="text-2xl font-bold">{element.title}</h6>
                </a>
                <p className="border-2 border-black rounded-full p-1">
                  {element.likes} likes
                </p>
              </div>
              <p className="mt-2">"{element.message}"</p>
            </div>
          );
        })
      ) : (
        <div>No Posts to Show...</div>
      )}
    </div>
  );
};

export default User;
