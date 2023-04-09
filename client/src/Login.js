import axios from "axios";
import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8000/login", {
      username: username,
      password: password,
    });

    console.log(response.data.token);
    localStorage.setItem("token", response.data.token);
    setNavigate(true);
  };

  if (navigate) {
    window.location.reload();
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex flex-col h-full items-center gap-16 bg-white">
      <div className="h-1/2 flex items-center  bg-white border-solid border-black border-2 mt-20">
        <form
          onSubmit={handleSubmit}
          className="flex justify-between items-center gap-5 p-10 bg-slate-400"
        >
          <label for="username">Username</label>
          <input
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 border-black"
          ></input>
          <label for="password">Password</label>
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-black"
          ></input>
          <button
            type="submit"
            className="p-3 bg-blue-300 border border-black rounded-full hover:bg-blue-600"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
