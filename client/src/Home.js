import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [latestPost, setLatestPost] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/").then((response) => {
      setLatestPost(response.data.result);
      console.log(latestPost);
    });
  }, []);

  return (
    <div className="flex h-screen bg-slate-200">
      <div className="self-center h-1/2 flex flex-col justify-center items-center w-fit ml-60 gap-8 text-5xl">
        Welcome to the blog!
        <div className="text-lg flex gap-8">
          <a
            href="/login"
            className="border-2 border-black rounded-full bg-green-600 p-3"
          >
            Log in
          </a>
          <a
            href="/signup"
            className="border-2 border-black rounded-full bg-green-600 p-3"
          >
            Sign up
          </a>
        </div>
      </div>
      <div className="absolute right-0 h-screen border-2 border-black">
        <h1 className="font-bold text-4xl text-center border-b-2 border-black">
          Latest Post
        </h1>
        {latestPost.map((element) => {
          return (
            <div className="flex flex-col border-b-2 border-black p-3 gap-4">
              <div className="flex gap-4 items-center">
                <h1 className="text-xl font-bold hover:text-violet-900">
                  {element.title}
                </h1>
                <p className="text-sm text-blue-700 hover:text-violet-900">
                  - {element.user.username}
                </p>
                <p className="text-xs">{element.createdAt.slice(0, 9)}</p>
              </div>
              <p>{element.message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
