import React, { useState, useEffect, useMemo } from "react";
import { login, logout } from "../services/firebase";
import { FaConfluence } from "react-icons/fa";

const Header = ({ filter, setFilter, user }) => {
  return (
    <div className="header">
      <nav className="nav">
        <div className="nav-logo-search">
          <FaConfluence
            style={{
              height: "3rem",
              width: "3rem",
              marginLeft: "2rem",
            }}
          />

          <input
            value={filter.query}
            onChange={(e) => setFilter({ ...filter, query: e.target.value })}
            placeholder="Searching..."
          />
        </div>
        <div className="nav-login-create">
          {user ? (
            <>
              <img
                style={{
                  height: "3.125rem",
                  width: "3.125rem",
                  borderRadius: "50%",
                  marginRight: "1rem",
                }}
                src={user.photoURL}
                alt={user.displayName}
              />
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <button onClick={login}>Login</button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
