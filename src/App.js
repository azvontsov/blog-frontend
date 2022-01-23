import { useState, useEffect, useMemo } from "react";
import { auth } from "./services/firebase";
import { Redirect } from "react-router-dom";
import "./styles/App.css";

// import components
import Header from "./components/Header";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

import PostFilter from "./components/PostFilter";
import Sidebar from "./components/Sidebar";
import MyModal from "./components/UI/MyModal/MyModal";

function App() {
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

  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const URL = "http://localhost:3001/posts/";
  // const URL = "https://blog-backend-az.herokuapp.com/posts/";

  // retrive all the posts

  const getPosts = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    console.log("getPost data", data);
    setPosts(data);
    setModal(false);

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
  const updatePost = async (newPost, id) => {
    await fetch(URL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(newPost),
    });
    getPosts();
  };
  const deletePost = async (id) => {
    await fetch(URL + id, {
      method: "DELETE",
    });
    getPosts();
  };
  // const removePost = (post) => {
  //   setPosts(posts.filter((p) => p.id !== post.id));

  const sortedPosts = useMemo(() => {
    console.log("function worked");
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      );
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.query.toLowerCase())
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

  // USERS
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Header user={user} filter={filter} setFilter={setFilter} />
        <Sidebar />
        <div class="content">
          <div className="post_container">
            <button style={createButtonStyle} onClick={() => setModal(true)}>
              Create Post
            </button>
            <MyModal visible={modal} setVisible={setModal}>
              <PostForm create={createPost} />
            </MyModal>

            <PostFilter filter={filter} setFilter={setFilter} />
            <PostList
              remove={deletePost}
              // remove={removePost}
              posts={sortedAndSearchedPosts}
              title={"Index of JS Posts"}
            />
          </div>
        </div>
        <div class="sidebar-r">side-r</div>
        <div class="footer">Footer</div>
      </div>
    </div>
  );
}

export default App;
