import React, { useState } from "react";
import PropTypes from "prop-types";
import blogService from "../services/blogs";
import Toggleable from "./Toggleable";

const BlogForm = (props) => {
  const [authorparam, setAuthor] = useState("");
  const [titleparam, setTitle] = useState("");
  const [urlparam, setUrl] = useState("");
  const setMessage = props.setMessage;
  const addToBlogState = props.addToBlogState;

  const addBlog = async (event) => {
    event.preventDefault();
    let reply = "";
    try {
      reply = await blogService.create({
        title: titleparam,
        url: urlparam,
        author: authorparam
      });
      if (reply.status === 200) {
        setTitle("");
        setAuthor("");
        setUrl("");
        addToBlogState(reply.body);
      }
    } catch {
      setMessage(reply.error);
    }
  };

  return (
    <Toggleable showName="hide form" hideName="create blog">
      <div>
        <h2>Create a new Blog</h2>
        <form onSubmit={addBlog}>
          Title:
          <br />
          <input
            value={titleparam}
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />
          Url:
          <br />
          <input
            value={urlparam}
            onChange={({ target }) => setUrl(target.value)}
          />
          <br />
          Author:
          <br />
          <input
            value={authorparam}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
          <button type="submit">post</button>
        </form>
      </div>
    </Toggleable>
  );
};
BlogForm.propTypes = {
  setMessage: PropTypes.func.isRequired,
  addToBlogState: PropTypes.func.isRequired
};
export default BlogForm;
//export default setShown;
