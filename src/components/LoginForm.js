import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import loginService from "../services/login";
import blogService from "../services/blogs";
import BlogForm from "./BlogForm";

const LoginForm = ({ setMessage }) => {
	const [username, setUsername] = useState("test1");
	const [password, setPassword] = useState("testi1111");
	const [user, setUser] = useState(null);
	useEffect(() => {
		if (typeof user !== "undefined" && user === null) {
			const tryLocalStorageUser = () => {
				const loggedUser = window.localStorage.getItem("loggedInUser");
				console.log("testing for user");
				if (typeof loggedUser !== "undefined" && loggedUser) {
					setUser(loggedUser);
					console.log("existing user found:" + user);
				}
				console.log("no existing user stored");
			};
			tryLocalStorageUser();
		}
	}, [user]);
	const handleLogout = () => {
		window.localStorage.removeItem("loggedInUser");
		setUser(null);
		setMessage(`logout successful`);
		blogService.unsetToken();
		setTimeout(() => {
			setMessage(null);
		}, 3000);
	};
	const tryLocalStorageUser = () => {
		const loggedUser = window.localStorage.getItem("loggedInUser");
		console.log("testing for user");
		if (typeof loggedUser !== "undefined" && loggedUser) {
			setUser(loggedUser);
			console.log("existing user found:" + user);
		}
		console.log("no existing user stored");
	};

	const handleLogin = async (event) => {
		event.preventDefault();
		console.log("logging in");
		if (typeof user !== "undefined" && user != null) {
			blogService.setToken(user.token);
			setMessage(`existing login found:": ${user.name}`);
			setTimeout(() => {
				setMessage("");
			}, 3000);
			console.log("existing user found by handle login");
			return;
		}
		const reply = await loginService.login({
			username,
			password
		});
		console.log(reply.body);
		if (reply.status === 200) {
			console.log("username = " + user.name);

			window.localStorage.setItem("loggedInUser", JSON.stringify(user));
			setUser(reply.body);
			blogService.setToken(JSON.parse(user.token));
			setUsername("");
			setPassword("");
			setMessage(`${user.name} has successfully logged in`);
			setTimeout(() => {
				setMessage("");
			}, 3000);
		} else {
			setMessage("wrong username or password");
		}
	};
	if (typeof user !== "undefined" && user === null) {
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
	setMessage: PropTypes.func.isRequired
};

export default LoginForm;
