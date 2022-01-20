import React from "react";

const PostItem = (props) => {
  return (
    <div className="post">
      <div className="post_content">
        <h2>
          {props.number}. {props.post.title}
        </h2>
        <h5>{props.post.hashtags}</h5>
        <div>{props.post.body}</div>
      </div>
      <br />
      <div className="post_footer">
        <div className="reactions">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            role="img"
            aria-labelledby="a5n2x5lv1vn5ny4pkn0z1uiui0i0195a"
            class="crayons-icon"
          >
            <path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path>
          </svg>
          <h5>18 reactions</h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            role="img"
            aria-labelledby="ac0maq6wi47jz7wtazpq1k9dpnfuwmrj"
            class="crayons-icon"
          >
            <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
          </svg>
          <h5>5 comments</h5>
        </div>
        <div className="post_btns">
          <button onClick={() => props.remove(props.post._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
