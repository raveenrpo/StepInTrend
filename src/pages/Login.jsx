import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Slices/Authlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isRegistered, registrationMessage, status } = useSelector(
    (state) => state.auth
  );
  const [mail, setmail] = useState("");
  const [name, setname] = useState("");
  const [pass, setpass] = useState("");
  const [phone, setphone] = useState(null);
  const [confirmpassword, setconfirmpassword] = useState("");

  const validate = async (e) => {
    e.preventDefault();

    const isValid = mail.includes("@") && pass === confirmpassword;
    if (!isValid) {
      alert("Please enter a valid email and passwords must match.");
      return;
    }

    const newUser = {
      name: name,
      phone_no: phone,
      email: mail,
      password: pass,
    };

    try {
      await dispatch(register(newUser));

      if (isRegistered) {
        if (registrationMessage == "User Already Exist") {
          alert("User already exists. Please log in.");
          navigate("/signin");
        } else if (registrationMessage == "Registered Successfully") {
          alert("Registration successful!");
          navigate("/signin");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register. Please try again.");
    }
  };
  return (
    <div>
      <form className="flex flex-col items-center sm:max-w-96 m-auto mt-14 gap-4 text-gray-600">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="text-3xl">REGISTER</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Enter your name"
          required
        ></input>
        <input
          type="text"
          id="name"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Enter your Phone no:"
          required
        ></input>
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
        <input
          type="Password"
          id="cofirmpassword"
          value={confirmpassword}
          onChange={(e) => setconfirmpassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Conform password"
          required
        ></input>
        <button
          className="bg-black text-white py-1 px-2"
          type="submit"
          onClick={validate}
        >
          Submit
        </button>

        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {registrationMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
