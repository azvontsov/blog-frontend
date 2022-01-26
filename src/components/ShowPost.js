import React from "react";

const ShowPost = ({ posts, id, useMemo }) => {
  const post = posts.find((post) => post._id === id);
  if (!post) return null;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <h3>{post.tags}</h3>
    </div>
  );
};

export default ShowPost;
