import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {

    const [latestPost, setLatestPost] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/").then((response) => {
            setLatestPost(response.data.result);
        });
    }, []);

    return(
        <div>
            <div>
                {latestPost.map((element) => {
                    return(
                        <div>
                            <h3>{element.title}</h3>
                            <p>{element.message}</p>
                            <p>{element.user.username}</p>
                            <p>{element.user.first_name}</p>
                            <p>{element.user.last_name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Home;