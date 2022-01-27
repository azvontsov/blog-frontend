import React, { useState } from "react";

const Sidebar = ({ filter, setFilter }) => {
  return (
    <div className="sidebar">
      <button onClick={(e) => setFilter({ ...filter, query: "#git" })}>
        #git
      </button>
      <button onClick={(e) => setFilter({ ...filter, query: "#react" })}>
        #react
      </button>
    </div>
  );
};

export default Sidebar;
