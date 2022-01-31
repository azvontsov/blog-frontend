import React, { useState, useEffect, useMemo } from "react";
import { login, logout } from "../services/firebase";
import {} from "react-icons/fa";

const Header = ({ filter, setFilter, user }) => {
  return (
    <div className="header">
      <nav className="nav">
        <div className="nav-logo-search">
          <div className="logo">
            <h1 style={{ fontSize: "2rem" }}>JS BLOG</h1>
          </div>
          <div style={{ width: "40rem" }}>
            <input
              value={filter.query}
              onChange={(e) => setFilter({ ...filter, query: e.target.value })}
              placeholder="Searching..."
            />
          </div>
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
              <button
                onClick={logout}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={login}
              style={{
                background: "none",
                border: "1px solid white",
                color: "white",
              }}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
