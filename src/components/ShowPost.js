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
          {/* Buttons */}
          <div className="edit-btns">
            <input
              type="submit"
              value="Update Post"
              style={{
                background: "black",
                color: "white",
                padding: ".4rem",
                borderRadius: ".2rem",
                border: "none",
                marginTop: ".5rem",
              }}
            />
          </div>
        </form>
      ) : (
        <div className="show-card">
          <h1>{editPost.title}</h1>
          <div style={{ whiteSpace: "pre" }}>{editPost.body}</div>
          <h5>{editPost.tags}</h5>
        </div>
      )}
      <hr
        style={{
          marginTop: "2rem",
        }}
      />
      {/* COMMENT FORM */}
      <div className="comment-card">
        <h4>Comments ({comments.length})</h4>
        <div className="comment-area">
          {comments.map((comment, index) => {
            return <h5>{comment}</h5>;
          })}
        </div>
      </div>
      {commentForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "1rem",
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
            name="comments"
            placeholder="Your comments "
          />
          <div className="save-comment">
            <input
              type="submit"
              value="Save comment"
              style={{
                background: "black",
                color: "white",
                padding: ".4rem",
                borderRadius: ".2rem",
                border: "none",
                marginTop: ".5rem",
              }}
            />
            {/* <input
              type="submit"
              value="Cancel"
              style={{
                background: "none",
                border: "1px solid ",
                padding: ".4rem",
                borderRadius: ".2rem",
                marginLeft: "1rem",
                marginTop: ".5rem",
              }}
              onClick={() => setCommentForm(false)}
            /> */}
          </div>
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
          ></h5>
        </div>

        <div className="post_btns">
          {editForm ? (
            <button
              onClick={() => setEditForm(false)}
              style={{
                background: "none",
                border: "1px solid ",
                padding: ".4rem",
                borderRadius: ".2rem",
                marginLeft: "1rem",
                marginTop: ".5rem",
              }}
            >
              Cancel
            </button>
          ) : (
            <div>
              <button
                onClick={() => setEditForm(true)}
                style={{
                  background: "black",
                  color: "white",
                  padding: ".4rem",
                  borderRadius: ".2rem",
                  border: "none",
                  marginTop: ".5rem",
                }}
              >
                Edit Post
              </button>
              <button
                onClick={() => remove(editPost._id)}
                style={{
                  background: "none",
                  border: "1px solid ",
                  padding: ".4rem",
                  borderRadius: ".2rem",
                  marginLeft: "1rem",
                  marginTop: ".5rem",
                }}
              >
                Delete Post
              </button>
            </div>
          )}
          {commentForm ? (
            <button
              onClick={() => setCommentForm(false)}
              style={{
                background: "none",
                border: "1px solid ",
                padding: ".4rem",
                borderRadius: ".2rem",

                marginTop: ".5rem",
              }}
            >
              Cancel
            </button>
          ) : (
            <div>
              {editForm ? null : (
                <button
                  onClick={() => setCommentForm(true)}
                  style={{
                    background: "black",
                    color: "white",
                    padding: ".4rem",
                    borderRadius: ".2rem",
                    border: "none",
                    marginTop: "1.5rem",
                    width: "10.5rem",
                  }}
                >
                  Comment
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowPost;
