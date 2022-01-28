import React from "react";
import { FaHeart, FaComments } from "react-icons/fa";

const PostItem = (props) => {
  const { post, updatePost, userEmail, setShow, setId } = props;
  const likes = props.post.likes || [];
  const comments = props.post.comments || [];
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
          {comments.includes(userEmail) ? (
            <a
              onClick={() =>
                updatePost({
                  ...post,
                  comments: comments.filter((email) => email != userEmail),
                })
              }
            >
              <FaComments style={{ color: "green" }} />
            </a>
          ) : (
            <a
              onClick={() =>
                updatePost({
                  ...post,
                  comments: [...comments, userEmail],
                })
              }
            >
              <FaComments style={{ color: "black" }} />
            </a>
          )}

          <h5>{comments.length} comments</h5>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
