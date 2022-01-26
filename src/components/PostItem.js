import React from "react";
import { FaHeart, FaComments } from "react-icons/fa";

const PostItem = (props) => {
  const { post, updatePost, userEmail, setShow, setId } = props;
  const likes = props.post.likes || [];
  const helper = () => {
    setShow(true);
    setId(post._id);
  };

  return (
    <div className="post">
      <div className="post_content">
        <h2
          onClick={() => {
            helper();
          }}
        >
          {props.number}. {post.title}
        </h2>
        <h5>{post.tags}</h5>
        <div>
          {`${post.body.substring(0, 350)}`}
          <a
            href="#"
            onClick={() => {
              helper();
            }}
          >
            {" "}
            Read more
          </a>
        </div>
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
