import React, {Fragment, useContext} from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contact/ContactContext';
import './Navbar.scss'
import userProfileDefaultPhoto from '../../assets/photo.png'

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
      <li className='container-link'>
        <div className='img-container '>
          <img src={userProfileDefaultPhoto} alt='User default profile' className='img-fluid' />
        </div>
        Hello {user && user.name} 
      </li>
      <li className='container-link hover-outline'>
        <Link to='/'>Home</Link>
      </li>
      <li className='container-link hover-outline'>
        <Link to='/about'>About</Link>
      </li>
      <li className='flex-center hover-outline'>
        <a href="#!" onClick={onLogout} className='flex-center'>
          <i className="fa fa-sign-out"></i>
          Logout
        </a>
      </li>
    </Fragment>
  ); 
  const guestLinks = (
    <Fragment>
      <li className='container-link hover-outline'>
        <Link to='/register'>Register</Link>
      </li>
      <li className='container-link hover-outline'>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  )
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={`${icon}`}></i>
        <span className='ml-2'>{title}</span>
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
