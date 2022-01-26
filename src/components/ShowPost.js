import React from "react";

const ShowPost = ({ posts, id, useMemo }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>{post._id === id ? (post.title, post.body) : ""}</div>
      ))}
    </div>
  );
};

export default ShowPost;
