import React from "react";
import { FaHeart, FaComments } from "react-icons/fa";

const ShowPost = ({ posts, id, updatePost, userEmail }) => {
  const post = posts.find((post) => post._id === id);
  if (!post) return null;

  const likes = post.likes || [];

  return (
    <>
      <div className="show-card">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <h5>{post.tags}</h5>
      </div>
      <div className="reactions">
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
      </div>
    </>
  );
};

export default ShowPost;
