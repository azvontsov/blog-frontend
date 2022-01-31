import React, { useState } from "react";

const Sidebar = ({ filter, setFilter }) => {
  return (
    <div className="sidebar">
      <div className="tags">
        <button onClick={(e) => setFilter({ ...filter, query: "#git" })}>
          #git
        </button>
        <button onClick={(e) => setFilter({ ...filter, query: "#react" })}>
          #react
        </button>
        <button onClick={(e) => setFilter({ ...filter, query: "#python" })}>
          #python
        </button>
        <button
          onClick={(e) => setFilter({ ...filter, query: "#productivity" })}
        >
          #productivity
        </button>
        <button onClick={(e) => setFilter({ ...filter, query: "#msw" })}>
          #msw
        </button>
        <button onClick={(e) => setFilter({ ...filter, query: "#javascript" })}>
          #javascript
        </button>
        <button onClick={(e) => setFilter({ ...filter, query: "#webdev" })}>
          #webdev
        </button>
        <button
          onClick={(e) => setFilter({ ...filter, query: "#programming" })}
        >
          #programming
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
