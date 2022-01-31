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
      title: "ReactJS Vs NodeJS : Better for app development in 2022",
      tags: "#javascript #webdev #programming #react",
      body: "Nowadays business globe has actually been boosted with several parts of web app development. If we think 2021, vast business have actually built their web applications to get substantial development. As necessary, it goes without stating that this year of 2022 will also enhance the application advancement industry. Hence if you prefer to develop an internet application, the programming language is the most significant point to assume. For internet app advancement JavaScript is just one of one of the most popular languages as well as there are various JavaScript structures to pick from. Remarkably, Node js as well as Respond js are the popular options available, but if you are perplexed to recognize which one is better. For your examination, we've prepared a well-defined summary of Node js vs React js with its features. Allow's read this post to learn which is better for Web application trends in 2022. What is ReactJS? A JavaScript library for creating interface. Respond makes it easy to make interactive UIs. Constructs encapsulated functions that handle their very own condition, then creates them to make complex UIs. Respond JS was originally developed by Jordan Walke. Today, ReactJS development has more than a thousand open source advocates. React authorizations you to user interface with other collections and structures. React can likewise influence the web server utilizing Node and power mobile applications utilizing React Native. Because element reasoning is made up in JavaScript rather than templates, you can easily offer abundant information with your app and also maintain the state out of the DOM. React js was founded in 2003 Node js was launched in 2009. Reactjs development mostly utilized in Client-sideUsed for server-side development and also client-side growth. Created with polished Vanilla JavaScriptWritten in C, C++, and also JavaScript. Sustains both android & web with the opening of react-native Node js sustains just web. No microservices as well as API supportMicro-services as well as API can be built with nodeJS. Utilized to make a scalable HTTP web server using Express or Simple HTTP moduleUsed to create single-page applications. Verdict: In this talk of Node js vs Respond js, currently you might have gotten some clear-cut clarification of both. Basically, Node.js development is best if you want to create a server-side internet app, and also React js is most ideal for making a web application development task with growing levels like energetic inputs and switches. We've prepared a difference between React js and Node js with its attributes for your future task principles. Allow's choose in between the two relying on your requirements`",
    },
    {
      id: 2,
      title:
        "React local development and testing mocking with msw and mss/data",
      tags: "#react #msw #javascript #typescript",
      body: "Background Recently, I found myself needing to mock CRUD operations from an API. At that time, the API was being developed by another engineer. We agreed on the API specs which allowed me to progress on building the UI.During development, the mocked APIs are useful to build to mock the actual API implementation. During testing, it is also valuable to be able to test the actual user interactions. There are amazing blog posts by Kent C. Dodds (author of @testing-library/react) on avoiding testing implementation details and mocking the actual API over mocking fetch. In this article, we will go though the approach I went to building this mock server using msw by building a simple pet dog CRUD application, that has the following features: List all dogs, Create a dog, Update a dog, Delete a dog, Additionally, data can be stored in-memory database provided by a standalone data library msw/datajs. This provides the capabilities of describing our data, persisting them in-memory and read/write operations. We will explore writing REST API handlers backed by the data library methods. Setup. In this article, l will be building a simple CRUD React application. To help quickly bootstrap my application I will be using the vitejs react-ts template and Chakra UI components. To help simplify and abstract our data-fetching and manage server state, react-query will be used. For this demo, we will need to install the msw libraries and a mock generator faker. At the time of writing, the latest version of faker has “endgamed”. For this post, we’ll use version 5.5.3, which still works.",
    },
    {
      id: 3,
      title: "Five Ways to Use Python in Your Business",
      tags: "#python",
      body: "One of the main reasons Python is such a massive hit with programmers is that it is extremely versatile. It can be used for web development, audio and video processing, and - one of the most popular uses - developing games. Many people also use Python as a way to create applications, from simple database applications to complex systems that interact with multiple servers. The potential uses for Python in the business world are endless, as it is both powerful and easy to understand. Here are five ways to use Python in your business: If you are new to Python, the crash course is a good start. <br /> Interactive Web Applications Python’s versatility shows in its ability to communicate across many different platforms and operating systems. For example, you can create a web app using Flask or Django which works on Windows, Linux, or OS X. The only prerequisite is Python 3. Finally, an application can run on pretty much any machine that has an internet connection and supports Python.",
    },
  ]);

  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [id, setId] = useState("");
  // const URL = "http://localhost:3001/posts/";
  const URL = "https://blog-backend-az.herokuapp.com/posts/";

  // retrieve all the posts

  const getPosts = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setPosts(data);
    setModal(false);
    // setShow(false);

    setTotalCount(response.headers["x-total-count"]);
  };
  const createPost = async (newPost) => {
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
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
    // setShow(true);
  };

  const deletePost = async (id) => {
    await fetch(URL + id, {
      method: "DELETE",
    });
    setShow(false);
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
    return sortedPosts.filter((post) => {
      return (
        (post.title &&
          post.title.toLowerCase().includes(filter.query.toLowerCase())) ||
        (post.body &&
          post.body.toLowerCase().includes(filter.query.toLowerCase())) ||
        (post.tags &&
          post.tags.toLowerCase().includes(filter.query.toLowerCase()))
      );
    });
  }, [filter.query, sortedPosts]);

  // run getPost
  useEffect(() => getPosts(), []);

  return (
    <div className="content">
      <div className="post_container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              padding: "10px",
              width: "30rem",
              marginTop: "9rem",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: ".4rem",
            }}
            onClick={() => setModal(true)}
          >
            Create Post
          </button>
        </div>
        <MyModal visible={modal} setVisible={setModal}>
          <PostForm create={createPost} />
        </MyModal>
        <MyModalShow visible={show} setVisible={setShow}>
          <ShowPost
            posts={sortedAndSearchedPosts}
            id={id}
            userEmail={userEmail}
            updatePost={updatePost}
            remove={deletePost}
            setShow={setShow}
            setId={setId}
          />
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
