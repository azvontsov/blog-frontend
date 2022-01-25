import React from "react";
import { FaHeart } from "react-icons/fa";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            role="img"
            class="crayons-icon"
          >
            <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
          </svg>
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
