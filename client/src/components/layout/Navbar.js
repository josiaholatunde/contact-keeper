import React, {Fragment, useContext} from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contact/ContactContext';
const Navbar = ({title, icon}) => {
  const authContext = useContext(AuthContext);
  const {user, isAuthenticated, logout } = authContext;

  const contactContext = useContext(ContactContext);

  const { clearContacts } = contactContext;


  const onLogout = () => {
    logout();
    clearContacts();
  }
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name} </li>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <a href="#!" onClick={onLogout}>
          <i className="fa fa-sign-out"></i>
          Logout
        </a>
      </li>
    </Fragment>
  ); 
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  )
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon}></i>
        {title}
      </h1>
      <ul>
        { isAuthenticated ? authLinks : guestLinks }
      </ul>
    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fa fa-id-card-o'
}

export default Navbar;
