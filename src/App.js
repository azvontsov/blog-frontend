import { useState, useEffect, useMemo } from "react";

import "./styles/App.css";

// import components
import Header from "./components/Header";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import { Container, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

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
    <Container
      sx={{
        mt: "1rem",
      }}
    >
      <Header />
      <h1 style={{ marginTop: "3rem", alignItems: "center" }}>Create Post</h1>
      <PostForm create={createPost} />
      <div>
        {/* SEARCHING */}
        <TextField
          label="search"
          variant="standard"
          fullWidth
          sx={{
            mt: "5rem",
            mb: "2rem",
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Searching..."
        />
      </div>
      <div>
        {/* SORTING */}
        <FormControl sx={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">Sorting</InputLabel>
          <Select
            value={selectedSort}
            onChange={sortPosts}
            defaultValue="Sorting"
            options={[
              { value: "title", name: "by name" },
              { value: "body", name: "by description" },
            ]}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* INDEX OF JS POSTS */}

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
    </Container>
  );
}

export default App;
