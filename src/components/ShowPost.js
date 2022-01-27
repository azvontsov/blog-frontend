import React from "react";
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
  const post = posts.find((post) => post._id === id);
  if (!post) return null;

  const likes = post.likes || [];

  const helper = () => {
    setShow(true);
    setId(post._id);
  };

  return (
    <>
      <div className="show-card">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <h5>{post.tags}</h5>
      </div>
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
          <button onClick={() => remove(post._id)}>Delete</button>
        </div>
      </div>
    </>
  );
};

export default ShowPost;
