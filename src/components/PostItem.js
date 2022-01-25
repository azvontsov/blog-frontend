import React from "react";
import { FaHeart, FaComments } from "react-icons/fa";

const PostItem = (props) => {
  const { post, updatePost, userEmail } = props;
  const likes = props.post.likes || [];
  return (
    <div className="post">
      <div className="post_content">
        <h2>
          {props.number}. {post.title}
        </h2>
        <h5>{post.tags}</h5>
        <div>{post.body}</div>
      </div>
      <br />
      <div className="post_footer">
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

          <h5>{likes.length} reactions</h5>
          <FaComments />

          <h5>5 comments</h5>
        </div>
        <div className="post_btns">
          <button onClick={() => props.remove(post._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
