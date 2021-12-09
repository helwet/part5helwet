import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import loginService from "../services/login";
import blogService from "../services/blogs";
import BlogForm from "./BlogForm";

const LoginForm = ({ setMessage }) => {
  const [username, setUsername] = useState("testrunner");
  const [password, setPassword] = useState("testrunner");
  //const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log(loggedUserJSON);
      blogService.setToken(user.token);
    } else {
      console.log("no user found");
    }
  }, []);
  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    //setUser(null);
    setMessage(`logout successful`);
    blogService.unsetToken();
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };
  const tryLocalStorageUser = () => {
    const loggedUser = window.localStorage.getItem("loggedInUser");
    console.log("testing for user");
    if (typeof loggedUser !== "undefined" && loggedUser != null) {
      const u = JSON.parse(loggedUser).token;
      blogService.setToken(u.token);
      //setUser(loggedUser);
      console.log("existing user found:" + u.username);
    }
    console.log("no existing user stored");
    return loggedUser;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    //console.log("logging in " + typeof user);
    /*
    if (
      typeof user === "undefined" ||
      (typeof user === "undefined" && user != null)
    ) {
      blogService.setToken(user.token);
      setMessage(`existing login found:": ${user.name}`);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      console.log("existing user found by handle login");
      return;
		}
		*/
    const reply = await loginService.login({
      username,
      password
    });
    console.log(JSON.stringify(reply));
    if (typeof reply !== "undefined") {
      if (reply.status === 401) {
        setMessage("wrong username or password");
        return;
      }
      //console.log("username = " + user.name);

      window.localStorage.setItem("loggedInUser", JSON.stringify(reply));
      //setUser(reply.body);
      blogService.setToken(reply);
      setUsername("");
      setPassword("");
      setMessage(`${reply.username} has successfully logged in`);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      setMessage("status 204. Try again");
    }
  };
  //if (typeof user !== "undefined" && user === null) {
  if (!blogService.tokenExists()) {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            submit
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={() => handleLogout()}> logout </button>
        <BlogForm setMessage={setMessage} />
      </div>
    );
  }
};
/*
					<button id="login-button" type="submit">
						{username}
					</button>
*/
LoginForm.propTypes = {
  setMessage: PropTypes.func.isRequired,
  addToBlogState: PropTypes.func.isRequired
};

export default LoginForm;
