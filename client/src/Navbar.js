import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Navbar = () => {
  const [navCurrentUser, setNavCurrentUser] = useState(null);
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token != 0) {
      axios
        .get("http://localhost:8000/getCurrentUser", {
          headers: { Authorization: token },
        })
        .then((response) => {
          setNavCurrentUser(response.data.currentUser);
        });
    }
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.setItem("token", 0);
    setNavCurrentUser(null);
    setNavigate(true);
  };

  if (navigate) {
    window.location.reload();
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex bg-slate-800 text-white text-xl h-20 p-10 justify-between items-center text-center border-b-2 border-solid border-black">
      <a href="/" className="hover:text-violet-500">
        Home
      </a>
      {navCurrentUser != null ? (
        <div className="flex gap-8">
          <h1 className="hover:bg-white p-1 text-yellow-500 border-2 border-yellow-300">
            <a href={`/users/${navCurrentUser._id}`}>
              {navCurrentUser.username}
            </a>
          </h1>
          <button
            onClick={logout}
            className="hover:bg-blue-600 p-1 border-2 rounded-md border-white"
          >
            Log Out
          </button>
        </div>
      ) : null}
      <div className="flex gap-4">
        <a href="/posts" className="hover:text-violet-500">
          All Posts
        </a>
        <a href="/users" className="hover:text-violet-500">
          See Users
        </a>
      </div>
    </div>
  );
};

export default Navbar;
