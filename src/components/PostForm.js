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
      <div className="input_field">
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
        <input
          value={post.hashtags}
          onChange={(e) => setPost({ ...post, hashtags: e.target.value })}
          type="text"
          placeholder="hashtags "
        />
        <button onClick={addNewPost}>Create Post</button>
      </div>
    </form>
  );
};

export default PostForm;
