import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Authentication({ text }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [show, setShow] = useState(false);
  //   const [, setPassword] = useState("");
  const subimtHandler = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(text === "signup", text);
      if (text === "signup") {
        console.log("this is the signup", name, email, mobile, password);
        const obj = {
          name,
          email,
          mobile,
          password,
          role,
        };
        console.log(obj, "this is the data");
        try {
          const response = await axios.post(
            "http://localhost:5169/api/Users/signup",
            obj
          );
          console.log(response.data);
          setName("");
          setEmail("");
          setMobile("");
          setPassword("");
          navigate("/login");
        } catch (err) {
          console.log("thisd is the error");
          console.log(err);
        }
      } else {
        try {
          const obj = {
            email,
            password,
          };
          const response = await axios.post(
            "http://localhost:5169/api/Users/Login",
            obj
          );
          console.log("******************************");
          console.log(response.data, typeof response.data);
          console.log("******************************");
          localStorage.setItem(
            "token",
            response.data.trim(),
            typeof response.data
          );
          setName("");
          setEmail("");
          setMobile("");
          setPassword("");
          navigate("/dashboard");
        } catch (err) {
          console.log(err);
        }
      }
    },
    [name, email, password, mobile, role, text, navigate]
  );
  console.log(text);
  return (
    <>
      <div className=" flex justify-between    h-screen w-screen overflow-hidden">
        <div
          className={` ${
            text === "signup" ? "bg-gray-800 " : "bg-white"
          }  md:w-[50%] hidden md:flex justify-center items-center`}
        >
          <div className="flex  justify-center items-center">
            <h1
              className={`text-center   ${
                text === "signup" ? "text-white" : "text-black"
              }  text-xl font-bold mt-[1rem]`}
            >
              Final Demo with React and Dot NET
            </h1>
          </div>
        </div>
        <div
          className={`   ${
            text === "signup" ? "bg-white" : "bg-gray-800"
          }  w-full md:w-[50%] `}
        >
          <div className="flex  w-full h-full justify-center items-center">
            <div className="flex md:w-[80%] w-[95%] shadow-md p-2 md:shadow-none flex-col    rounded-md">
              <h2
                className={`text-center ${
                  text === "signup" ? "text-black" : "text-white"
                }   mb-5 text-xl font-bold`}
              >
                {text === "signup" ? "Signup" : "Login"}
              </h2>
              <form onSubmit={subimtHandler}>
                {text === "signup" && (
                  <div
                    className={`w-full mt-5 border ${
                      text === "signup" ? "border-gray-500" : "border-white"
                    }   `}
                  >
                    <input
                      required
                      className={` w-full h-full outline-none ps-2 py-1 text-xl`}
                      type="text"
                      placeholder="Enter Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                )}
                <div className="w-full mt-5 border border-gray-500 ">
                  <input
                    required
                    className={`w-full h-full outline-none ps-2  ${
                      text === "signup" ? "p-1" : "py-3"
                    }  text-xl`}
                    type="text"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className=" flex  mt-5   items-center justify-between">
                  {text === "signup" && (
                    <div className="w-[80%] border border-gray-500 ">
                      <input
                        required
                        className="w-full h-full outline-none ps-2 py-1 text-xl"
                        type="number"
                        placeholder="Enter Your Mobile Number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                  )}
                  {text === "signup" && (
                    <div className="w-[15%] border border-gray-500 text-center">
                      <select
                        className="rounded-md w-full transition-all duration-300 py-1 border-none outline-none px-2"
                        name="roles"
                        id="roles"
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                  )}
                </div>
                <div className="w-full  mt-5 border border-gray-500 relative">
                  <input
                    required
                    className={`w-full h-full outline-none ps-2  ${
                      text === "signup" ? "py-1" : "py-3"
                    }   text-xl`}
                    type={!show ? "password" : "text"}
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span onClick={() => setShow((pre) => !pre)}>
                    {show ? (
                      <i className=" text-2xl  fa fa-eye-slash absolute top-0 right-5"></i>
                    ) : (
                      <i className=" text-2xl  fa fa-eye absolute top-0 right-5"></i>
                    )}
                  </span>
                </div>
                <div className="flex mt-5 justify-center items-center">
                  <button
                    type="submit"
                    className={`${
                      text === "signup"
                        ? "bg-black text-white hover:text-black hover:bg-white"
                        : "bg-white text-black hover:text-white hover:bg-black"
                    }  px-4 py-1 font-bold rounded-md transition-colors duration-700 hover:border-none`}
                  >
                    {text}
                  </button>
                </div>
                <div className={`${text === "signup" ? "" : "text-white"}`}>
                  {text === "signup" ? (
                    <div className="text-center mt-6">
                      {" "}
                      Already Have An Account?{"  "}
                      <Link className="underline" to="/login">
                        Login
                      </Link>{" "}
                    </div>
                  ) : (
                    <div className="text-center mt-6">
                      {" "}
                      Don't Have An Account?{"  "}
                      <Link className="underline" to="/signup">
                        Signup
                      </Link>{" "}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Authentication;
