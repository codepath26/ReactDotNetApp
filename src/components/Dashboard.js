import React, { useCallback, useEffect, useState } from "react";

import axios from "axios";
import Pagination from "./pagination/Pagination";

function Dashboard() {
  const [userList, setUserList] = useState([]);

  const [display, setDisplay] = useState(1);
  const [alter, setAlert] = useState("");
  // const [isActive, setIsActive] = useState(true);

  // Adding the status of the user

  useEffect(() => {}, []);

  // Getting user Details
  const getUsersDetails = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token, "this is the jwt token for you");
      const response = await axios.get(
        "http://localhost:5169/api/Users/GetAllUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      // Authorization: `Bearer ${token}`,
      setUserList(response.data);
    } catch (error) {
      console.log(error.message);
      console.log(error.response.status);
      if (error.response.status === 403) {
        setAlert("You are not Admin Change Your Role To Get Access");
      }
    }
  }, []);

  return (
    <div className="flex justify-center flex-col items-center h-screen w-screen overflow-hidden">
      <button
        onClick={getUsersDetails}
        className={`  border rounded-md border-green-600 hover:bg-green-600 hover:border-none text-black px-2 py-1 hover:text-white transition-all
        duration-300 ${
          userList.length > 0 && "pointer-events-none opacity-10 bg-yellow-200 "
        } `}
      >
        GetUserDetails
      </button>
      <span className="text-red-600 text-center mt-5">{alter}</span>

      <div className="overflow-x-auto">
        <table className="table-auto min-w-full">
          <thead className="">
            <tr>
              <th className=" border px-4 py-2">Name</th>
              <th className=" border px-4 py-2">Email</th>
              <th className=" border px-4 py-2">Mobile</th>
              <th className=" border px-4 py-2">Password</th>
              <th className=" border px-4 py-2">Role</th>
              <th className=" border px-4 py-2">Status</th>
              <th className=" border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <Pagination
              userList={userList}
              setUserList={setUserList}
              setDisplay={setDisplay}
              display={display}
            />
          </tbody>
        </table>
        {userList.length > 0 && (
          <div className="my-10 flex justify-around ">
            <div className=" w-[70%]  flex justify-around">
              <button
                onClick={() => setDisplay(1)}
                className="hover:bg-purple-400 bg-purple-600 px-6 font-bold py-1 text-white rounded-md border-none"
              >
                First
              </button>
              <button
                onClick={() =>
                  setDisplay((prev) => (prev === 1 ? prev : prev - 1))
                }
                className="hover:bg-purple-400 bg-purple-600 px-6 font-bold py-1 text-white rounded-md border-none"
              >
                Prev
              </button>
              <div className="bg-gray-600 rounded-full text-white m-2 px-3 flex justify-center items-center text-xl py-1">
                <span>{display} </span>
              </div>
              <button
                onClick={() =>
                  setDisplay((prev) =>
                    Math.floor(userList.length / 10) === prev ? prev : prev + 1
                  )
                }
                className="hover:bg-purple-400 bg-purple-600 px-6 font-bold py-1 text-white rounded-md border-none"
              >
                Next
              </button>
              <button
                onClick={() => setDisplay(Math.floor(userList.length / 10))}
                className="hover:bg-purple-400 bg-purple-600 px-6 py-1 text-white rounded-md border-none font-bold"
              >
                Last
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// Experiment@2112

export default Dashboard;
