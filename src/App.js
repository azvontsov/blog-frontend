import { useState, useEffect, useMemo } from "react";

import "./styles/App.css";

// import components
import Header from "./components/Header";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "r" },
    { id: 2, title: "Python", body: "u" },
    { id: 3, title: "React", body: "j" },
  ]);

  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const URL = "https://blog-backend-az.herokuapp.com/posts/";

  // retrive all the posts

  const getPosts = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    console.log("getPost data", data);
    setPosts(data);
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
  // };

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  };

  const sortedPosts = useMemo(() => {
    console.log("function worked");
    if (selectedSort) {
      return [...posts].sort((a, b) =>
        a[selectedSort].localeCompare(b[selectedSort])
      );
    }
    return posts;
  }, [selectedSort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) => post.title.includes(searchQuery));
  }, [searchQuery, sortedPosts]);

  // run getPost
  useEffect(() => getPosts(), []);

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: "55px 0" }} />
      <div>
        <MyInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Searching..."
        />

        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Sorting"
          options={[
            { value: "title", name: "by name" },
            { value: "body", name: "by description" },
          ]}
        />
      </div>
      {posts.length !== 0 ? (
        <PostList
          remove={deletePost}
          // remove={removePost}
          posts={sortedAndSearchedPosts}
          title={"Index of JS Posts"}
        />
      ) : (
        <h1 style={{ textAlign: "center" }}>No post founded</h1>
      )}
    </div>
  );
}

export default App;
