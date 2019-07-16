import React, {useReducer} from 'react';
import AuthReducer from './AuthReducer';
import axios from 'axios';
import AuthContext from './AuthContext';
import { REGISTER_SUCCESS, REGISTER_FAILED, CLEAR_ERRORS, USER_LOADED, AUTH_ERRORS, LOGIN_SUCCESS, LOGIN_FAILED, LOG_OUT } from '../types';
import setAuthToken from '../../utils/setAuthToken';
const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null
  }

  const [state, dispatch ] = useReducer(AuthReducer, initialState);


  //Load user
  const loadUser = async () => {
    localStorage.token && setAuthToken(localStorage.token);
    try {
      const response = await axios.get('/api/auth');
      dispatch({type: USER_LOADED, payload: response.data});

    } catch (error) {
      dispatch({type: AUTH_ERRORS, payload: error.response.data.msg});

    }    
  }

  //Login user

  //register user
  const registerUser = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await axios.post('/api/users', formData, config);

      dispatch({type: REGISTER_SUCCESS, payload: response.data.token});
      loadUser();
    } catch (error) {
      dispatch({type: REGISTER_FAILED, payload: error.response.data.msg})
    }
  }
  const loginUser = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await axios.post('/api/auth', formData, config);

      dispatch({type: LOGIN_SUCCESS, payload: response.data.token});
      loadUser();
    } catch (error) {
      dispatch({type: LOGIN_FAILED, payload: error.response.data.msg})
    }
  }

  //Logout

  const logout = () => {
    dispatch({type: LOG_OUT});
  }

  //CLear Errors
  const clearErrors = () => {
    dispatch({type: CLEAR_ERRORS});
  }

  return <AuthContext.Provider value={{
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    user: state.user,
    registerUser,
    clearErrors,
    loadUser,
    loginUser,
    logout
  }}>
  {props.children}
  </AuthContext.Provider>
}


export default AuthState;