import axios from "axios";
const baseUrl = "https://fullstackopen-blogs001.herokuapp.com/api/blogs";
//const baseUrl = "https://ghmou.sse.codesandbox.io/api/blogs";
let token = null;

//const getID = () => {};

const setToken = (user) => {
  //console.log(user);
  token = "bearer " + String(user.token);
  console.log("token is: " + token);
  // id = user.id;
  //window.localStorage.setItem("token", token);
};

const unsetToken = () => {
  token = null;
  window.localStorage.removeItem("token");
};

const tokenExists = () => {
  console.log("token exists " + typeof token !== "undefined" && token !== null);
  return typeof token !== "undefined" && token !== null;
};

const getAll = async () => {
  console.log("token exists: " + token !== null);
  const response = await axios.get(baseUrl);
  console.log(response.data);
  return response.data;
};

const create = async (newObject) => {
  console.log("token exists: " + token !== null);
  const config = {
    headers: { Authorization: token }
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const likeBlog = async (id) => {
  //console.log("token exists:");
  console.log(id + "token exists: " + token);
  return await axios.put(
    `${baseUrl}/${id}`,
    {},
    {
      headers: { authorization: token }
    }
  );
};

const deleteBlog = async (id) => {
  console.log("token exists: " + token !== null);
  const config = { headers: { authorization: token } };
  return await axios.delete(`${baseUrl}/${id}`, config);
};

export default {
  getAll,
  create,
  likeBlog,
  deleteBlog,
  //update,
  setToken,
  unsetToken,
  tokenExists
  //getID
};
