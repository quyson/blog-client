import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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

    return(
        <div>
            <div>
                { currentUser ? <div>{currentUser.username}</div> : null}
            </div>
           <div>
                { post ?  
                <div>
                    <h1>{post.title}</h1>
                    <div>{post.likes}</div>
                    <div>{post.message}</div>
                    <div>{post.user.username}</div>
                </div> : null}
           </div>
           <h1>Comments</h1>
           {comments && comments.length > 0 ? comments.map((element) => {
                return(
                    <div>
                        <h6>{element.user.username}</h6>
                        <p>{element.message}</p>
                        <p>{element.likes}</p>
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