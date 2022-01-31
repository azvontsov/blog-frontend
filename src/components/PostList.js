import React from "react";
import PostItem from "./PostItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const PostList = ({
  posts,
  title,
  remove,
  userEmail,
  updatePost,
  setShow,
  setId,
}) => {
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>Posts were not found</h1>;
  }

  return (
    <div className="index-of-posts">
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) => (
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <PostItem
              remove={remove}
              number={index + 1}
              post={post}
              key={post.id}
              userEmail={userEmail}
              updatePost={updatePost}
              setShow={setShow}
              setId={setId}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default PostList;
