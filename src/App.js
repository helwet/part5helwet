import "./styles.css";
import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
//import BlogForm from "./components/BlogForm";

import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  //	const [showAll, setShowAll] = useState(false);
  const [NotificationMessage, setNotificationMessage] = useState("");
  //const blogFormRef = useRef;

  // Fetch blogs from backend on initial app load
  useEffect(() => {
    var all = [];
    const fetchAllBlogs = async () => {
      all = await blogService.getAll();
      console.log("blogs useeffect");
      //console.log(JSON.stringify(all));
      //console.log(all[0]);
      setBlogs(all.sort((a, b) => b.likes - a.likes));
    };
    fetchAllBlogs();
  }, []);

  const addToBlogState = (blog) => {
    setBlogs(blogs.concat(blog));
  };
  const rmBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };
  return (
    <div>
      <h1>Blogs app</h1>
      <Notification message={NotificationMessage} />
      <div>
        <LoginForm
          setMessage={setNotificationMessage}
          addBlog={addToBlogState}
        />
      </div>
      <div>
        <h1>Blogs</h1>
        {/*<button onClick={() => setShowAll(!showAll)}>Show all </button>*/}

        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            setMessage={setNotificationMessage}
            removeBlog={rmBlog}
          />
        ))}
      </div>
      <div></div>

      <Footer />
    </div>
  );
};

export default App;
