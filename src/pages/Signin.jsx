import React, { useEffect } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Slices/Authlice";
const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, token, status, registrationMessage } = useSelector(
    (state) => state.auth
  );
  const [mail, setmail] = useState("");
  const [pass, setpass] = useState("");

  const handlesignin = async (e) => {
    e.preventDefault();
    const user = {
      email: mail,
      password: pass,
    };
    await dispatch(login(user));
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      localStorage.setItem("user", token.userName);
      localStorage.setItem("role", token.role);
      localStorage.setItem("token", token.token);
      localStorage.setItem("id", token.userid);
      if (token.role === "Admin") {
        console.log(token.role);
        navigate("/adminhome");
        return;
      } else if (token.error) {
        alert(token.error);
      }

      navigate("/");
    } else if (registrationMessage === "User is blocked by admin") {
      alert("User Is Blocked By Admin");
      navigate("/login");
    } else if (status === "failed" && token && token.error) {
      alert(token.error);
    } else if (status === "failed") {
      alert("Incorrect email or password ");
    }
  }, [isAuthenticated, token, registrationMessage, status, navigate]);

  return (
    <div>
      <div>
        <form className="flex flex-col items-center sm:max-w-96 m-auto mt-14 gap-4 text-gray-600">
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className="text-3xl">Login</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>
          <input
            type="email"
            id="email"
            value={mail}
            onChange={(e) => setmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Enter your email"
            required
          ></input>
          <input
            type="Password"
            id="password"
            value={pass}
            onChange={(e) => setpass(e.target.value)}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Enter your password"
            required
          ></input>
          <p>Dont have an account</p>
          <Link to={"/login"}>
            <p>Register</p>
          </Link>
          <button
            className="bg-black text-white py-1 px-2"
            type="submit"
            onClick={handlesignin}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
