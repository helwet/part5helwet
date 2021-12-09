import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";
import Toggleable from "./Toggleable";

const Blog = ({ blog, setMessage, rmBlog }) => {
  const [likes, setLikes] = useState(blog.likes);
  const id = blog.id;
  const addLike = async () => {
    try {
      const reply = await blogService.likeBlog(id);
      console.log(reply);
      if (reply.status === 200) {
        setLikes(likes + 1);
        setMessage("liked blog " + blog.title);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        setMessage("log in to like");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch {
      setMessage("log in to like");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div className="blog" style={blogStyle}>
      <b>{blog.title}</b>
      <div>
        <div>author : {blog.author}</div>
        <Toggleable showName="hide details" hideName="show details">
          <div>link : {blog.url}</div>
          <div> likes : {likes}</div>
          <button
            onClick={() => {
              const reply = blogService.deleteBlog(id);
              if (reply.status === 200) {
                setMessage("success!");
                rmBlog(id);
              }
              setMessage(reply.error);
            }}
          >
            delete
          </button>
          <button onClick={() => addLike(id)}> like </button>
        </Toggleable>
      </div>
    </div>
  );
};
/*
const Blog = ({ blog }) => {
  return (
    <div>
      {blog.title}
      link : {blog.url}
      author : {blog.author}
      likes : {blog.likes} toggleImportance={() => addLikeToBlog(Blog.id)}
    </div>
  );
};
*/
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
  rmBlog: PropTypes.func.isRequired
};

export default Blog;
