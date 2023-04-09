import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .get("http://localhost:8000/users", { headers: { Authorization: token } })
      .then((response) => {
        setUserList(response.data.result);
        console.log(response.data.result);
      });
  }, []);

  return (
    <div>
      <h1 className=" w-full text-3xl font-bold mt-3 p-3">All Users</h1>
      <div className="p-3 grid h-full auto-rows-auto grid-cols-3 gap-2">
        {userList.map((element) => {
          return (
            <div className="flex border-2 border-black gap-2 p-3  bg-blue-200 hover:bg-yellow-200">
              <a href={`/users/${element._id}`}>
                <h6 className="text-2xl font-bold hover:text-violet-600">
                  {element.username}
                </h6>
              </a>
              <p>({element.first_name + " " + element.last_name})</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
