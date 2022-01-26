import React from "react";
import { useState, useEffect, useMemo } from "react";

import PostList from "./PostList";
import PostForm from "./PostForm";
import PostFilter from "./PostFilter";
import MyModal from "./UI/MyModal/MyModal";
import MyModalShow from "./UI/MyModalShow/MyModalShow";
import ShowPost from "./ShowPost";

const Main = ({ filter, setFilter, userEmail }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Frontend Challenges: Front-end Engineer Assignment",
      tags: "#react",
      body: "The original post was published at iamtk.co. This is part of the Frontend Challenges Series. Today I finished a frontend challenge and I had a blast working on it. There were so many interesting concepts I debated with myself while designing and implementing the feature, so I was eager to document and share everything I learned through this entire journey.",
    },
    {
      id: 2,
      title: "What is Module?",
      tags: "#python",
      body: "A module is a file containing Python definitions and statements which we can use in other Python programs. A module is simply a “Python file” which contains code(functions, classes,lists etc) we can reuse in multiple Python programs. Modules in Python can be of two types. Built-in Modules. User-defined Modules. Modules allows us to use the functionality we need when we need it, and it keeps our code cleaner.",
    },
    {
      id: 3,
      title: "Create Ozark's hypnotizing title animation with Greensock (GSAP)",
      tags: "#javascript",
      body: "To mark the occasion of the TV show Ozark releasing its fourth season, I created the title sequence as a web animation. For some viewers, a show's title sequence is nothing more than a minute long segment to be skipped past,or used as an opportunity to squeeze in a quick activity before the show starts, but they are missing out in the case of Ozark. The show is known for its dynamic plot and stark imagery, and if you pay close attention to the show's brief title sequence, you can appreciate how it complements the tone of the show.",
    },
  ]);

  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const URL = "http://localhost:3001/posts/";
  // const URL = "https://blog-backend-az.herokuapp.com/posts/";

  // retrive all the posts

  const getPosts = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setPosts(data);
    setModal(false);
    setShow(false);

    setTotalCount(response.headers["x-total-count"]);
  };
  const createPost = async (newPost) => {
    await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(newPost),
    });
    getPosts();
  };
  const updatePost = async (post) => {
    await fetch(URL + post._id, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(post),
    });
    getPosts();
  };
  const deletePost = async (id) => {
    await fetch(URL + id, {
      method: "DELETE",
    });
    getPosts();
  };

  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      );
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(filter.query.toLowerCase()) ||
        post.body.toLowerCase().includes(filter.query.toLowerCase()) ||
        post.tags.toLowerCase().includes(filter.query.toLowerCase())
    );
  }, [filter.query, sortedPosts]);

  // run getPost
  useEffect(() => getPosts(), []);

  const createButtonStyle = {
    padding: "10px",
    width: "30rem",
    marginTop: "5rem",
    marginLeft: "20%",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: ".4rem",
  };
  return (
    <div class="content">
      <div className="post_container">
        <button style={createButtonStyle} onClick={() => setModal(true)}>
          Create Post
        </button>

        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost} />
        </MyModal>
        <MyModalShow visible={show} setVisible={setShow}>
          <ShowPost posts={sortedAndSearchedPosts} id={id} />
        </MyModalShow>

        <PostFilter filter={filter} setFilter={setFilter} />
        <PostList
          remove={deletePost}
          posts={sortedAndSearchedPosts}
          title={"Index of JS Posts"}
          userEmail={userEmail}
          updatePost={updatePost}
          setShow={setShow}
          setId={setId}
        />
      </div>
    </div>
  );
};

export default Main;
