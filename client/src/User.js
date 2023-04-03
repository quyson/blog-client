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
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:8000/users/${id}`, { headers: {Authorization : token}}).then((response) => {
            setUser(response.data.resultUser);
            setPosts(response.data.resultPost);
            setCurrentUser(response.data.currentUser);
        });
    }, [])

    return(
        <div>
            <div>
                { currentUser ? <div>{currentUser.username}</div> : null}
            </div>
           <div>
                { user ?  
                <div>
                    <h1>{user.username}</h1>
                    <div>{user.first_name + " " + user.last_name}</div>
                    <div>{user.bio}</div>
                </div> : null}
           </div>
           <h1>Posts</h1>
           { posts && posts.length > 0 ? posts.map((element) => {
                return(
                    <div>
                        <Link to={`/posts/${element._id}`}><h6>{element.title}</h6></Link>
                        <p>{element.message}</p>
                        <p>{element.likes}</p>
                    </div>
                )
            }) : <div>No Posts to Show...</div>}
        </div>
    );
};

export default User