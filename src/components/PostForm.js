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
            style={{
              padding: ".5rem",

              fontSize: "inherit",
              fontFamily: "inherit",
            }}
          />

          <textarea
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
            type="text"
            placeholder="Post Description "
            style={{
              minWidth: "100%",
              maxWidth: "100%",
              minHeight: "100px",
              padding: ".5rem",
              overflowX: "scroll",
              fontSize: "inherit",
              fontFamily: "inherit",
              marginBottom: "1rem",
            }}
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
