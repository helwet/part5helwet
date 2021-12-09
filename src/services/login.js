import axios from "axios";
const baseUrl = "https://ghmou.sse.codesandbox.io/api/login";
//const baseUrl = "https://fullstackopen-blogs001.herokuapp.com/api/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
