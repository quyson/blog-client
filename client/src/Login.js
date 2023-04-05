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
            password: password
        });

        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        setNavigate(true)
    };

    if(navigate){
        window.location.reload();
        return <Navigate to={"/"}/>
    }


    return(
        <div>
            <h1>Log In!</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label for="username">Username</label>
                    <input name="username" onChange={e => setUsername(e.target.value)}></input>
                    <label for="password">Password</label>
                    <input name="password" type="password" onChange={e => setPassword(e.target.value)}></input>
                    <button type="submit">Log in</button>
                </form>
            </div>
        </div>
    )
}

export default Login;