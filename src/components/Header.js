import React from "react";

const Header = () => {
  return (
    <nav className="nav">
      <div className="nav-logo-search">
        <h1>LOGO</h1>
        <input />
      </div>
      <div className="nav-login-create">
        <h1>Log in</h1>
        <button>Create account</button>
      </div>
    </nav>
  );
};

export default Header;
