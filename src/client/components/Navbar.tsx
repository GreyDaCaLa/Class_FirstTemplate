import { useHistory } from "react-router";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { removeAccessTokens } from "../utils/apiService";

const Navbar: React.FC<INavbarProps> = ({ isAdmin, setIsAdmin }) => {
  const history = useHistory();

  const handleSignOut = () => {
    removeAccessTokens();
    setIsAdmin(false);
    history.push("/");
  };

  if (isAdmin) {
    return (
      <nav className="navbar bg-primary">
        <h1>Bestbye</h1>
        <ul className="nav">
          <li className="nav-item">
            <NavLink className="nav-link text-light" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-light" to="/products">
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <span className="nav-link btn-info" onClick={handleSignOut}>
              Sign Out
            </span>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="navbar bg-primary">
        <h1>Bestbye</h1>
        <ul className="nav">
          <li className="nav-item">
            <NavLink className="nav-link text-light" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-light" to="/products">
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-light" to="/login">
              Log In
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
};

interface INavbarProps {
  isAdmin: boolean;
  setIsAdmin: any;
}

export default Navbar;
