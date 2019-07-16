import React, {useState, useContext, useEffect} from 'react'
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const Register = (props) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const { name, email, password, password2 } = user;

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);


  const {setAlert} = alertContext;
  const { registerUser, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) props.history.push('/');
    if (error === 'Username already exists!') {
      setAlert(error, 'danger');
      clearErrors();
    }
    //eslint-disable-next-line
  }, [isAuthenticated, error, props.history])

  const handleChange = ({target}) => setUser({...user, [target.name]: target.value});
  
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
    <div className="form-container">
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
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" value={password2} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-block btn-primary" name="submit" value='Register' />
        </div>
      </form>

    </div>
  )
}

export default Register
