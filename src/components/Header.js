import React, { useState, useEffect, useMemo } from "react";

const Header = ({ filter, setFilter }) => {
  return (
    <nav className="nav">
      <div className="nav-logo-search">
        <h1>LOGO</h1>
        <input
          value={filter.query}
          onChange={(e) => setFilter({ ...filter, query: e.target.value })}
          placeholder="Searching..."
        />
      </div>
      <div className="nav-login-create">
        <h1>Log in</h1>
        <button>Create account</button>
      </div>
    </nav>
  );
};

export default Header;
