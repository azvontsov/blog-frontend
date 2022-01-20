import React from "react";
import { useState } from "react";

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: "", body: "" });

  const addNewPost = (e) => {
    e.preventDefault();
    create(post);
    setPost({ title: "", body: "" });
  };

  return (
    <form>
      <input
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Post Name"
      />

      <input
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Post Description "
      />
      <button onClick={addNewPost}>Create Post</button>
    </form>
  );
};

export default PostForm;
