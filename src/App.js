import { useState, useEffect, useMemo } from "react";

import "./styles/App.css";

// import components
import Header from "./components/Header";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "JavaScript",
      hashtags: "#git",
      body: "Exercitation ut sunt, qui drumstick pork belly frankfurter aliquip ribeye. Ut brisket minim kevin consequat sint. Jerky ut cupim dolore shoulder, magna porchetta alcatra pig short ribs ipsum nulla. Dolore dolor kevin, ham hock filet mignon bacon ipsum deserunt. Enim pork belly non dolor, anim in shoulder est.",
    },
    {
      id: 2,
      title: "Python",
      hashtags: "#productivity",
      body: "Cillum do ipsum jerky eu dolor pork loin eiusmod pork belly filet mignon non prosciutto. Qui est short ribs in, corned beef irure ribeye excepteur alcatra. Cow pig ut duis frankfurter quis. Salami ipsum spare ribs, laboris chislic exercitation deserunt pancetta pig buffalo reprehenderit. Sirloin voluptate magna ipsum venison irure ut officia pastrami. Andouille venison ut, tenderloin chicken ad mollit.",
    },
    {
      id: 3,
      title: "React",
      hashtags: "#tutorial",
      body: "Pig biltong ex pariatur. Nisi burgdoggen ad ipsum, nostrud beef anim consectetur alcatra. Meatball esse eiusmod beef ribs. Hamburger fugiat ground round, pork tri-tip dolore in spare ribs sed aliquip velit buffalo nulla bacon et. Tail sunt tongue prosciutto tri-tip fatback porchetta short ribs. Short ribs sirloin ut, kevin drumstick culpa corned beef shoulder salami beef beef ribs deserunt kielbasa in.",
    },
  ]);
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // const URL = "http://localhost:3001/posts/";
  // const URL = "https://blog-backend-az.herokuapp.com/posts/";

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
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, sortedPosts]);

  // run getPost
  useEffect(() => getPosts(), []);

  return (
    <div className="App">
      <div className="container">
        <div class="header">
          <Header />
        </div>

        <div class="sidebar">
          <a>#git</a>
          <a>#productivity</a>
          <a>#javascript</a>
          <a>#typescript</a>
          <a>#webdev</a>
          <a>#react</a>
        </div>

        <div class="content">
          <div className="post_container">
            <div className="create_post">
              <PostForm create={createPost} />
            </div>

            {/* SEARCHING */}
            <div>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Searching..."
              />
              {/* SORTING */}
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
            {sortedAndSearchedPosts.length ? (
              <PostList
                remove={deletePost}
                // remove={removePost}
                posts={sortedAndSearchedPosts}
                title={"Index of JS Posts"}
              />
            ) : (
              <h1 style={{ textAlign: "center" }}>Posts were not found</h1>
            )}
          </div>
        </div>
        <div class="sidebar-r">side-r</div>
        <div class="footer">Footer</div>
      </div>
    </div>
  );
}

export default App;
