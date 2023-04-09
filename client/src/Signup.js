import React from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [navigate, setNavigate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/signup", {
      first_name,
      last_name,
      username,
      password,
      bio,
    });
    setNavigate(true);
  };

  if (navigate) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="flex h-screen bg-slate-500 items-start justify-center">
      <form
        onSubmit={handleSubmit}
        className="h-1/2 w-1/2 flex justify-start items-center flex-wrap gap-1 mt-20 bg-white"
      >
        <label for="first_name" className="w-fit">
          First Name
        </label>
        <input
          name="first_name"
          id="first_name"
          onChange={(e) => setFirstName(e.target.value)}
          className="border-2 border-black"
        ></input>
        <label for="last_name" className="w-fit">
          Last Name
        </label>
        <input
          name="last_name"
          id="last_name"
          onChange={(e) => setLastName(e.target.value)}
          className="border-2 border-black"
        ></input>
        <label for="username" className="w-fit">
          Username
        </label>
        <input
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-black"
        ></input>
        <label for="password" className="w-fit">
          Password
        </label>
        <input
          name="password"
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-black"
        ></input>
        <label for="bio" className="w-fit">
          Bio
        </label>
        <input
          name="bio"
          id="bio"
          onChange={(e) => setBio(e.target.value)}
          className="border-2 border-black"
        ></input>
        <button
          type="submit"
          className="ml-48 border-2 border-black rounded-full p-3 bg-blue-400 hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
