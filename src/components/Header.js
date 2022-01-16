import { login, logout } from "../services/firebase";
import { Link } from "react-router-dom";
function Header(props) {
  return (
    <nav className="nav">
      <Link to="/">
        <div>Blog App</div>
      </Link>
      {props.user ? (
        <>
          <img
            style={{
              height: "3rem",
              width: "3rem",
              borderRadius: "50%",
              margin: "0 1rem 0 1rem",
            }}
            src={props.user.photoURL}
            alt={props.user.displayName}
          />
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </nav>
  );
}

export default Header;
