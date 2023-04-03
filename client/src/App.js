import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Users from './Users';
import User from "./User";
import Posts from "./allPosts";
import CreatePost from "./createPost";
import Post from './Post';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path ="/users/:id" element={<User />}></Route>
        <Route path ="/posts" element={<Posts />}></Route>
        <Route path ="/posts/create" element={<CreatePost />}></Route>
        <Route path ="/posts/:id" element={<Post />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
