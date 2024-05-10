import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function Pagination({ userList, setUserList, setDisplay, display }) {
  // Handle Edit Functionality
  const [displayData, setDisplayData] = useState([]);

  const editHandler = useCallback(async (user) => {
    console.log("this");
    console.log(user);
  }, []);

  // Handle User Acount Status
  const activeHandler = useCallback(async (pass, id) => {
    console.log(id, pass, "this is the status of the component");
    setUserList((prev) => {
      console.log(prev);
      let userArray = [...prev];
      let existingUserIndex = userArray.findIndex(
        (element) => element.id === id
      );
      let existingUser = userArray.find((element) => element.id === id);
      existingUser = { ...existingUser, isActive: pass };
      userArray[existingUserIndex] = existingUser;
      console.log(userArray);
      return userArray;
    });
    const response = await axios.patch(
      `http://localhost:5169/api/Users/handleActive/${id}`,
      {
        IsActive: pass,
      }
    );
    console.log(response.data, "this is the response data");
  }, []);

  useEffect(() => {
    const setPagination = () => {
      console.log(display, "this is the display count");
      const startingIndex = (display - 1) * 10;
      const lastIndex = startingIndex + 10;
      console.log(
        startingIndex,
        lastIndex,
        "this is the starting index and last index"
      );

      const newList = userList.slice(startingIndex, lastIndex);
      console.log(newList, newList.length);
      setDisplayData(newList);
    };
    setPagination();
  }, [userList, display]);
  return (
    <>
      {displayData?.map((user) => (
        <tr key={user.id}>
          <td
            className={`${!user.isActive && "line-through"}  border px-4 py-2`}
          >
            {user.name}
            {console.log(user.isActive)}
          </td>
          <td
            className={`${!user.isActive && "line-through"}  border px-4 py-2`}
          >
            {user.email}
          </td>
          <td
            className={`${!user.isActive && "line-through"}  border px-4 py-2`}
          >
            {user.mobile}
          </td>
          <td
            className={`${!user.isActive && "line-through"}  border px-4 py-2`}
          >
            {user.password}
          </td>
          <td
            className={`${!user.isActive && "line-through"}  border px-4 py-2`}
          >
            {user.role}
          </td>
          <td className={`${!user.isActive && "disabled"}  border px-4 py-2`}>
            <div
              onClick={() => activeHandler(!user.isActive, user.id)}
              className="flex justify-center items-center cursor-pointer"
            >
              {user.isActive ? (
                <div className="text-green-600 ">
                  <FaCheckCircle />
                </div>
              ) : (
                <div className="text-red-600">
                  <FaTimesCircle />
                </div>
              )}
            </div>
          </td>
          <td className="border px-4 py-2">
            <button
              onClick={() => editHandler()}
              className={`bg-yellow-400 text-white px-2 rounded-md`}
            >
              Edit
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}

export default Pagination;
