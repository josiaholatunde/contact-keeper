import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';
const Login = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const authContext = useContext(AuthContext);
  const { loginUser, isAuthenticated, error, clearErrors } = authContext;

  const alertContext = useContext(AlertContext);
  const {  setAlert } = alertContext;
  const { email, password } = user;
  const onChange = ({target}) => setUser({...user, [target.name]: target.value});
  useEffect(() => {
    if (isAuthenticated) props.history.push('/');
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    //eslint-disable-next-line
  }, [isAuthenticated, error, props.history])
  const handleSubmit = e => {
    e.preventDefault();
    loginUser(user);
    //Handle Submit
  }
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Email</label>
          <input type="text" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} />
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-block btn-primary" name="submit" value='Login' />
        </div>
      </form>

    </div>
  )
}

export default Login
