import React from "react";
import { useState } from "react";

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: "", body: "", tags: "" });

  const addNewPost = (e) => {
    e.preventDefault();
    create(post);
    setPost({ title: "", body: "", tags: "" });
  };

  return (
    <form>
      <div className="create_post">
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
            value={post.tags}
            onChange={(e) => setPost({ ...post, tags: e.target.value })}
            type="text"
            placeholder="tags "
          />
          <button onClick={addNewPost}>Create Post</button>
        </div>
      </div>
    </form>
  );
};

export default PostForm;
