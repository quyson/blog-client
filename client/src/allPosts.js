import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Posts = () => {

    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        axios.get("http://localhost:8000/posts", { headers: {Authorization : token}}).then((response) => {
            setPostList(response.data.result);
            console.log(response.data.result);
        });
    }, [])

    return(
        <div>
            <a href="/posts/create">Create a New Post</a>
            <h1>All Posts</h1>
            {postList.map((element) => {
                return(
                    <div>
                        <Link to={`/posts/${element._id}`}><h6>{element.title}</h6></Link>
                        <p>{element.message}</p>
                        <p>{element.user.username}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Posts