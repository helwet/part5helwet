import axios from "axios";
const baseUrl = "https://fullstackopen-blogs001.herokuapp.com/api/blogs";

var token;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
	//window.localStorage.setItem("token", token);
};

const unsetToken = () => {
	token = null;
	//window.localStorage.removeItem("token");
};

const getAll = async () => {
	const response = await axios.get(baseUrl);
	console.log(response.data);
	return response.data;
};

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token }
	};

	const response = await axios.post(baseUrl, newObject, config);
	return response.data;
};

const likeBlog = async (id) => {
	return axios.put(`${baseUrl}/${id}`);
};
const update = async (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request.then((response) => response.data);
};

const deleteBlog = async (id) => {
	const config = { headers: { Authorization: `bearer ${token}` } };
	return axios.delete(`${baseUrl}/${id}`, config);
};

export default {
	getAll,
	create,
	likeBlog,
	deleteBlog,
	update,
	setToken,
	unsetToken
};
