import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Dropdown from 'react-bootstrap/Dropdown';
import { useRef } from "react";
import open_menu from '../images/open_menu.png'
import close_menu from '../images/close_menu.png'

const Navbar = () => {
  const {user, token, login, logout} = useAuth();
  const history = useHistory();
  const handleLogin = () => {
    login(user, token)
    history.push('/login');
  };

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  const handleProfileClick = () => {
    history.push(`/users/profile/${user.username}`);
  };
  const menuRef = useRef();

  const openMenu = () => {
    menuRef.current.style.right="0";
  }

  const closeMenu = () => {
    menuRef.current.style.right="-350px";
  }

  return (
    <nav className="navbar navbar-expand-sm fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Blogs Website</a>
        <img src={open_menu} onClick={openMenu} alt="open_menu" className='nav-mob-open'/>
        <div className="links">
        <ul ref={menuRef} className="navbar-menu">
        <img src={close_menu} onClick={closeMenu} alt="close_menu" className='nav-mob-close' />
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {user ? (
              <li>
              <button className="showLoginBtn" onClick={handleLogout}>Logout</button>
              </li>
          ) : (
            <li>
            <button className="showLoginBtn" onClick={handleLogin}>Login</button>
            </li>
          )}
        </ul>
        </div>
        </div>
        <div className='nav-username'>
          {user? (
            
            <Dropdown className='drop-down'>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {`Welcom, ${user.username}`}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleProfileClick}>See your profile</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ): ('')}
        </div>
    </nav>
  );
};

export default Navbar;
