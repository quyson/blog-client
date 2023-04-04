import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Posts = () => {

    const [postList, setPostList] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        axios.get("http://localhost:8000/posts", { headers: {Authorization : token}}).then((response) => {
            setPostList(response.data.result);
        });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get("http://localhost:8000/getCurrentUser", { headers: {Authorization : token}}).then((response) => {
            setCurrentUser(response.data.currentUser._id);
        });
    }, []);

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:8000/posts/${id}`, {headers: {Authorization: token}}).then((result) => {
            window.location.reload();
        });
    };

    return(
        <div>
            {currentUser === null ? null : <a href="/posts/create">Create a New Post</a>}
            <h1>All Posts</h1>
            {postList.map((element) => {
                return(
                    <div>
                        <Link to={`/posts/${element._id}`}><h6>{element.title}</h6></Link>
                        {element.user._id == currentUser ? 
                        <div>
                            <button type="button" onClick={(e) => handleDelete(element._id)}>Delete</button>
                            <button type="button">Edit</button>
                        </div>
                         : null}
                        <p>{element.message}</p>
                        <p>{element.user.username}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Posts