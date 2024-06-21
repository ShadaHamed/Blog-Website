import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Dropdown from 'react-bootstrap/Dropdown';

const Navbar = () => {
  const {user, token, login, logout} = useAuth();
  const history = useHistory();
  const handleLogin = () => {
    login(user, token)
    history.push('/login');
    console.log('user from navbar after login', user)
  };

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  const handleProfileClick = () => {
    history.push(`/users/profile/${user.username}`);
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
            
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {`Welcom, ${user.username}`}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleProfileClick}>See your profile</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ): ('')}
        </div>
        </div>
    </nav>
  );
};

export default Navbar;
