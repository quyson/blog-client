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
            first_name, last_name, username, password, bio
        });
        setNavigate(true);
    }

    if(navigate){
        return <Navigate to={"/login"}/>
    }

    return(
        <div>
            <h1>Sign up!</h1>
            <form onSubmit={handleSubmit}>
                <label for="first_name">First Name</label>
                <input name="first_name" id="first_name" onChange={e => setFirstName(e.target.value)}></input>
                <label for="last_name">Last Name</label>
                <input name="last_name" id="last_name" onChange={e => setLastName(e.target.value)}></input>
                <label for="username">Username</label>
                <input name="username" id="username" onChange={e => setUsername(e.target.value)}></input>
                <label for="password">Password</label>
                <input name="password" id="password" type="password" onChange={e => setPassword(e.target.value)}></input>
                <label for="bio">Bio</label>
                <input name="bio" id="bio" onChange={e => setBio(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
    </div>
    )
};

export default Signup