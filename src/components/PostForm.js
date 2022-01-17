import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import MyInput from "./UI/input/MyInput";
import { TextField } from "@mui/material";

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: "", body: "" });

  const addNewPost = (e) => {
    e.preventDefault();
    create(post);
    setPost({ title: "", body: "" });
  };

  return (
    <form>
      <TextField
        label="Post Name"
        variant="outlined"
        fullWidth
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Post Name"
      />

      <TextField
        label="Post Description"
        variant="outlined"
        fullWidth
        sx={{
          mt: "1rem",
        }}
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Post Description "
      />
      <Button
        sx={{
          mt: "2rem",
        }}
        variant="outlined"
        onClick={addNewPost}
      >
        Create Post
      </Button>
    </form>
  );
};

export default PostForm;
