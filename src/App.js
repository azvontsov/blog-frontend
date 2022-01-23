import { useState, useEffect } from "react";
import { auth } from "./services/firebase";
import "./styles/App.css";

// import components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Main from "./components/Main";

function App() {
  const [filter, setFilter] = useState({ sort: "", query: "" });

  // USERS
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Header user={user} filter={filter} setFilter={setFilter} />
        <Main filter={filter} setFilter={setFilter} />
        <Sidebar />

        <div class="sidebar-r">side-r</div>
        <div class="footer">Footer</div>
      </div>
    </div>
  );
}

export default App;
