import React, { useState } from "react";
import { FaHeart, FaComments } from "react-icons/fa";

const ShowPost = ({
  posts,
  id,
  updatePost,
  userEmail,
  remove,

  setShow,
  setId,
}) => {
  // const [edit, setEdit] = useState(false);
  const post = posts.find((post) => post._id === id);
  console.log(post);
  // const [form, setForm] = useState({

  //   title: "",
  //   body: "",
  //   tags: "",
  // });
  const [editForm, setEditForm] = useState(post);
  const [commentForm, setCommentForm] = useState(post);

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.title]: e.target.value,
    });
    setCommentForm({
      ...commentForm,
      [e.target.title]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost(editForm, id);
  };

  // const helper = async () => {
  //   await setForm({
  //     title: post.title,
  //     body: post.body,
  //     tags: post.tags,
  //   });
  //   setShow(true);
  //   setId(post._id);
  // };

  if (!post) return null;
  const likes = post.likes || [];
  const comments = post.comments || [];

  return (
    <>
      {editForm ? (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <input
            value={post.title}
            style={{
              minHeight: "30px",
              fontSize: "1rem",
              fontFamily: "inherit",
              padding: ".5rem",
              marginBottom: "1rem",
            }}
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="Post Name"
          />
          <textarea
            // rows="20"
            // cols="100"
            style={{
              minWidth: "100%",
              maxWidth: "100%",
              minHeight: "300px",
              padding: ".5rem",
              overflowX: "scroll",
              fontSize: "1rem",
              fontFamily: "inherit",
              marginBottom: "1rem",
            }}
            value={post.body}
            onChange={handleChange}
            type="text"
            name="body"
            placeholder="Post Description "
          />
          <input
            value={post.tags}
            style={{
              minHeight: "30px",
              fontSize: "1rem",
              fontFamily: "inherit",
              padding: ".5rem",
              marginBottom: "1rem",
            }}
            onChange={handleChange}
            type="text"
            name="tags"
            placeholder="tags "
          />

          <input type="submit" value="Update Post" />
        </form>
      ) : (
        <div className="show-card">
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <h5>{post.tags}</h5>
        </div>
      )}
      {/* COMMENT FORM */}

      {commentForm ? (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "4rem",
          }}
        >
          <textarea
            value={post.comments}
            style={{
              minWidth: "100%",
              maxWidth: "100%",
              minHeight: "100px",
              padding: ".5rem",
              overflowX: "scroll",
              fontSize: "1rem",
              fontFamily: "inherit",
              marginBottom: "1rem",
            }}
            onChange={handleChange}
            type="text"
            name="Your comment here"
            placeholder="comments "
          />

          <input type="submit" value="Update Post" />
        </form>
      ) : (
        <div className="comment-card">
          <h5>{post.comments}</h5>
        </div>
      )}
      {/* COMMENT FORM END */}
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

          <h5
            style={{
              marginLeft: "1rem",
            }}
          >
            {comments.length} comments
          </h5>
        </div>

        <div className="post_btns">
          {editForm ? (
            <button onClick={() => setEditForm(false)}>Cancel</button>
          ) : (
            <div>
              <button onClick={() => setEditForm(true)}>Edit</button>
              <button onClick={() => remove(post._id)}>Delete</button>
            </div>
          )}
          {commentForm ? (
            <button onClick={() => setCommentForm(false)}>Cancel</button>
          ) : (
            <div>
              <button onClick={() => setCommentForm(true)}>Comment</button>
            </div>
          )}

          {/* <button
            style={{
              marginTop: "3rem",
              background: "green",
              padding: ".5rem",
              borderRadius: ".2rem",
              border: "none",
            }}
          >
            Comment
          </button> */}
        </div>
      </div>
    </>
  );
};

export default ShowPost;
