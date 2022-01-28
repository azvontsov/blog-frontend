import React, { useState, useEffect } from "react";
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
  const post = posts.find((post) => post._id === id);

  const [editForm, setEditForm] = useState(false);
  const [editPost, setEditPost] = useState(post);
  const [commentForm, setCommentForm] = useState(false);
  const [editComment, setEditComment] = useState("");

  useEffect(() => {
    setEditPost(post);
  }, [post]);

  const handleChange = (e) => {
    setEditPost({
      ...editPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeComment = (e) => {
    setEditComment(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("submitting", editPost);
    e.preventDefault();
    const postToSubmit =
      editComment == ""
        ? editPost
        : {
            ...editPost,
            comments: [...(editPost.comments || []), editComment],
          };
    updatePost(postToSubmit);
    setCommentForm(false);
    setEditForm(false);
    setEditComment("");
  };

  if (!editPost) return null;
  const likes = editPost.likes || [];
  const comments = editPost.comments || [];

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
            value={editPost.title}
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
            value={editPost.body}
            onChange={handleChange}
            type="text"
            name="body"
            placeholder="Post Description "
          />
          <input
            value={editPost.tags}
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
          <h1>{editPost.title}</h1>
          <p>{editPost.body}</p>
          <h5>{editPost.tags}</h5>
        </div>
      )}
      {/* COMMENT FORM */}
      <div className="comment-card">
        {comments.map((comment, index) => {
          return <h5>{comment}</h5>;
        })}
      </div>
      {commentForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "4rem",
          }}
        >
          <textarea
            value={editComment}
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
            onChange={handleChangeComment}
            type="text"
            name="Your comment here"
            placeholder="comments "
          />

          <input
            type="submit"
            value="Save comment"
            style={{
              width: "30%",
              backgroundColor: "green",
              border: "none",
              padding: ".4rem",
              borderRadius: ".2rem",
              color: "white",
            }}
          />
          <input
            type="submit"
            value="Cancel"
            style={{
              width: "30%",
              backgroundColor: "red",
              border: "none",
              padding: ".4rem",
              borderRadius: ".2rem",
              color: "white",
              marginTop: "1rem",
            }}
            onClick={() => setCommentForm(false)}
          />
        </form>
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
                  ...editPost,
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
                  ...editPost,
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
              <button onClick={() => remove(editPost._id)}>Delete</button>
            </div>
          )}
          {commentForm ? (
            <button onClick={() => setCommentForm(false)}>Cancel</button>
          ) : (
            <div>
              <button
                onClick={() => setCommentForm(true)}
                style={{
                  marginTop: "2rem",
                  backgroundColor: "green",
                  border: "none",
                  padding: ".4rem",
                  borderRadius: ".2rem",
                }}
              >
                Comment
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowPost;
