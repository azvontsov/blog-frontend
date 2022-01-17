import React from "react";

import Button from "@mui/material/Button";

const PostItem = (props) => {
  return (
    <div className="post">
      <div className="post_content">
        <strong>
          {props.number}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div className="post_btns">
        <Button variant="outlined" onClick={() => props.remove(props.post._id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PostItem;
