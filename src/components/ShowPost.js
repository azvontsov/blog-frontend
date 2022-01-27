import React, { useState } from "react";
import { FaHeart, FaComments } from "react-icons/fa";

const ShowPost = ({
  posts,
  id,
  updatePost,
  userEmail,
  remove,
  edit,
  setShow,
  setId,
}) => {
  const [editing, setEditing] = useState(false);
  const post = posts.find((post) => post._id === id);
  const [form, setForm] = useState({
    title: "",
    body: "",
    tags: "",
  });

  if (!post) return null;

  const likes = post.likes || [];

  const helper = async () => {
    await setForm({
      title: post.title,
      body: post.body,
      tags: post.tags,
    });
    setShow(true);
    setId(post._id);
  };

  return (
    <>
      {editing ? (
        <form>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            type="text"
            placeholder="Post Name"
          />
          <textarea
            rows="50"
            cols="100"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            type="text"
            placeholder="Post Description "
          />
          <input
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            type="text"
            placeholder="tags "
          />
          <button
            onClick={() =>
              updatePost({
                ...form,
              })
            }
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div className="show-card">
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <h5>{post.tags}</h5>
        </div>
      )}
      <div
        className="reactions"
        style={{
          margin: "1rem 0 1rem 0",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            flexDirection: "row",
          }}
        >
          {likes.includes(userEmail) ? (
            <a
              onClick={() =>
                updatePost({
                  ...post,
                  likes: likes.filter((email) => email != userEmail),
                })
              }
            >
              <FaHeart style={{ color: "red" }} />
            </a>
          ) : (
            <a
              onClick={() =>
                updatePost({
                  ...post,
                  likes: [...likes, userEmail],
                })
              }
            >
              <FaHeart style={{ color: "black" }} />
            </a>
          )}
          <h5 style={{ marginLeft: "1rem" }}>{likes.length} reactions</h5>
        </div>

        <div className="post_btns">
          {editing ? (
            <button onClick={() => setEditing(false)}>Cancel</button>
          ) : (
            <div>
              <button onClick={() => setEditing(true)}>Edit</button>
              <button onClick={() => remove(post._id)}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowPost;
