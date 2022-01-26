import React from "react";

const ShowPost = ({ posts, id }) => {
  console.log(id);
  return (
    <div>
      {posts.map((post, index) => (
        <h1>{post._id === id ? (post.title, post.body) : ""}</h1>
      ))}
    </div>
  );
};

export default ShowPost;
