import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CheckAllPosts.css";

const CheckAllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const request = async () => {
      const responce = await axios.get("https://test.flcd.ru/api/post");
      setPosts(responce.data);
    };
    request();
  }, []);

  return (
    <div>
      <h1>Все посты</h1>
      <div className="posts">
        {posts.map((elem) => (
          <div className="post">
            <Link to={`/posts/${elem.id}`}>
              {elem.id}{" "}
              {elem.text.length > 14
                ? elem.text.slice(0, 25) + "......."
                : elem.text}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckAllPosts;
