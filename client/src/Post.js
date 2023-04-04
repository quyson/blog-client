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
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:8000/posts/${id}`, { headers: {Authorization : token}}).then((response) => {
            setPost(response.data.resultPost);
            setComments(response.data.resultComments);
            setCurrentUser(response.data.currentUser);
        });
    }, [])

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post("http://localhost:8000/posts/:id/createComment", {
            message: message, user: currentUser._id, post: id
        }, {headers: {Authorization: token}});
        window.location.reload();
    };

    const setVisibility = (e) => {
        e.preventDefault();
        setCommentForm(!commentForm);
    }

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        axios.post(`http://localhost:8000/comment/delete`,{id: id}, {headers: {Authorization: token}}).then((result) => {
            window.location.reload();
        });
    };

    const handleCommentLikes = (id) => {
        const token = localStorage.getItem('token');
        axios.post(`http://localhost:8000/comment/like`,{id: id}, {headers: {Authorization: token}}).then((result) => {
            window.location.reload();
        });
    }

    const handlePostLikes = (id) => {
        const token = localStorage.getItem('token');
        axios.post(`http://localhost:8000/posts/like`,{id: id}, {headers: {Authorization: token}}).then((result) => {
            window.location.reload();
        });
    };

    return(
        <div>
           <div>
                { post ?  
                <div>
                    <h1>{post.title}</h1>
                    <div onClick={(e) => handlePostLikes(post._id)}>{post.likes}</div>
                    <div>{post.message}</div>
                    <div>{post.user.username}</div>
                </div> : null}
           </div>
           <h1>Comments</h1>
           {comments && comments.length > 0 ? comments.map((element) => {
                return(
                    <div>
                        <h6>{element.user.username}</h6>
                        {element.user._id === currentUser._id ? 
                        <div>
                            <button type="button" onClick={(e) => handleDelete(element._id)}>Delete</button>
                            <button type="button">Edit</button>
                        </div>
                         : null}
                        <p>{element.message}</p>
                        <p onClick={(e) => handleCommentLikes(element._id)}>{element.likes}</p>
                    </div>
                )
           }): <div> No Comments to Show...</div>}
           { commentForm ? <form onSubmit={handleCommentSubmit}>
                <label for="message">Message</label>
                <input name="message" id="message" onChange={e => setMessage(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form> : <button type="submit" onClick={setVisibility}>Create a Comment</button> }
        </div>
    )
}

export default Post;