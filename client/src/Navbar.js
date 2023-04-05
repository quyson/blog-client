import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Navbar = () => {

    const [navCurrentUser, setNavCurrentUser] = useState(null);
    const [navigate, setNavigate] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if(token != 0){
            axios.get("http://localhost:8000/getCurrentUser", { headers: {Authorization : token}}).then((response) => {
            setNavCurrentUser(response.data.currentUser.username);
            });
        };
    }, []);

    const logout = (e) => {
        e.preventDefault();
        localStorage.setItem('token', 0);
        setNavCurrentUser(null);
        setNavigate(true);
    };

    if(navigate){
        window.location.reload();
        return <Navigate to={"/"}/>
    }

    return(
        <div>
            <a href="/">Home</a>
            {navCurrentUser != null ? 
            <div>
                <h1>{navCurrentUser}</h1>
                <button onClick={logout}>Log Out</button>
            </div> : 
            <div>
                <a href="/login">login</a>
                <a href="/signup">Sign Up</a>
            </div>}
            <a href="/posts">All Posts</a>
            <a href="/users">See Users</a>
        </div>
    )
}

export default Navbar;