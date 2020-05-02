import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";
import Spinner from "../layout/Spinner";

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errorState, setError] = useState({
    password: ''
  })

  const authContext = useContext(AuthContext);
  const { loginUser, isAuthenticated, error, clearErrors, loading } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { email, password } = user;

  
  const onChange = ({ target }) => {
    if (target.name === 'password' && target.value.trim().length < 7) {
      setError({
        password: 'Password must have a minimum length of 7'
      })
    } else {
      setError({
        password: ''
      })
    }
    setUser({ ...user, [target.name]: target.value });
  }

  useEffect(() => {
    if (isAuthenticated) props.history.push("/");
    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [isAuthenticated, error, props.history, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(user);
  };

  const isFormValid = () => {
    return email && email.trim().length > 0 && password && password.length > 7
  }
  return (loading ? (<Spinner />): <div className="form-container">
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
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
          { errorState && errorState.password && <span className='text-error'> { errorState.password } </span>}
        </div>
        <div className="form-group">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            name="submit"
            value="Login"
            disabled={!isFormValid()}
          />
        </div>
      </form>
    </div>
);

}

export default Login;
