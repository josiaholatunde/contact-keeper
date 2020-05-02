import React, {useState, useContext, useEffect} from 'react'
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';
import validateEmail from '../../utils/isEmailValid';
import Spinner from '../layout/Spinner';

const Register = (props) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const [errorState, setError] = useState({
    password2: ''
  })
  const { name, email, password, password2 } = user;

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);


  const {setAlert} = alertContext;
  const { registerUser, error, clearErrors, isAuthenticated, loading } = authContext;

  useEffect(() => {
    if (isAuthenticated) props.history.push('/');
    if (error === 'Username already exists!') {
      setAlert(error, 'danger');
      clearErrors();
    }
    //eslint-disable-next-line
  }, [isAuthenticated, error, props.history])

  const handleChange = ({target}) => {
    if (target.name === 'password2' && password) {
      const password2 = target.value;
      if (password2 !== password.trim()) {
        setError({password2: 'Passwords do not match'})
      } else {
        setError({ password2: ''})
      }
    }

    if (target.name === 'email' && target.value.trim().length > 0) {
      const email = target.value;
      if (!validateEmail(email)) {
        setError({
          email: 'Invalid email'
        })
      } else {
        setError({
          email: ''
        })
      }
    }
    setUser({...user, [target.name]: target.value});
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    if (!name || !email  || !password || !password2) {
      setAlert('Please enter all the fields', 'danger');
      return;
    }
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
      return;
    }
    registerUser({name, email, password});
  }
  return (
    loading ? (<Spinner />): <div className="form-container">
    <h1>
      Account <span className="text-primary">Registration</span>
    </h1>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" value={email} onChange={handleChange} />
        { errorState && errorState.email && <span className='text-error'> { errorState.email } </span> }
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={password} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="password2">Confirm Password</label>
        <input type="password" name="password2" value={password2} onChange={handleChange} />
        { errorState && errorState.password2 && <span className='text-error'> { errorState.password2 } </span> }
      </div>
      <div className="form-group">
        <input type="submit" className="btn btn-block btn-primary" name="submit" value='Register' />
      </div>
    </form>

  </div>
  )
}

export default Register
