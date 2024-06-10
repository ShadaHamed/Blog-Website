import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Container } from "react-bootstrap";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {isAuthenticated, user,token,login,logout} = useAuth();
  const history = useHistory();
  console.log('user from navbar', user)
  const handleLogin = () => {
    // login(user, token)
    history.push('/login');
  };

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <nav className="navbar navbar-expand-sm fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Blogs Website</a>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {user ? (
              <button className="showLoginBtn" onClick={handleLogout}>Logout</button>
          ) : (
            <button className="showLoginBtn" onClick={handleLogin}>Login</button>
          )}
          {user? (
            <p> Welcome, {user.username}</p>
          ): ('')}
        </div>
        </div>
    </nav>
  );
};

export default Navbar;
