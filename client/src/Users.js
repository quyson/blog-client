import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        axios.get("http://localhost:8000/users", { headers: {Authorization : token}}).then((response) => {
            setUserList(response.data.result);
            console.log(response.data.result);
        });
    }, [])

    return(
        <div>
            <h1>All Users</h1>
            {userList.map((element) => {
                return(
                    <div>
                        <Link to={`/users/${element._id}`}><h6>{element.username}</h6></Link>
                        <p>{element.first_name + element.last_name}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Users