import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="nav">
      <Link to="/">
        <div>Blog App</div>
      </Link>
    </nav>
  );
};

export default Header;
