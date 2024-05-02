import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    phoneNum: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick(e);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (user.username.length < 4) {
      setSuccessMessage("Username must be at least 4 characters long!");
      return;
    }
    if (!user.email.includes("@")) {
      setSuccessMessage("Invalid email.");
      return;
    }
    if (user.phoneNum.length !== 10) {
      setSuccessMessage("Invalid Phone Number.");
      return;
    }
    if (user.password.length < 8) {
      setSuccessMessage("Password must be at least 8 characters long.");
      return;
    }

    try {
      console.log(user);
      const res = await axios.post("http://localhost:8800/users", user);
      console.log(res.data);

      if (res.status === 200) {
        setSuccessMessage("Registration successful!");
        setUser({
          username: "",
          password: "",
          email: "",
          phoneNum: "",
        });
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setSuccessMessage("Username already exists!");
      } else {
        console.log(err);
        alert("An error occurred while processing your request!");
      }
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Username
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                name="username"
                type="text"
                onKeyPress={handleKeyPress}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                name="email"
                type="text"
                onKeyPress={handleKeyPress}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Phone Number
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 "
                name="phoneNum"
                type="text"
                onKeyPress={handleKeyPress}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                name="password"
                type="password"
                onKeyPress={handleKeyPress}
                onChange={handleChange}
              />
            </div>
            {successMessage && (
              <p
                className={
                  successMessage === "Registration successful!"
                    ? "text-green-700"
                    : "text-red-600"
                }
              >
                {successMessage}
              </p>
            )}
            <button
              className="text-white bg-gray-900 hover:bg-gray-800 hover:text-gray-100 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
              onClick={handleClick}
            >
              Register
            </button>
          </form>
          <div className="text-center">
            <Link
              className="text-sm text-gray-500 hover:text-gray-700"
              to="/Login"
            >
              Already have an account? Log in here.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
