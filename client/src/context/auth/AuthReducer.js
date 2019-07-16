import { REGISTER_SUCCESS, REGISTER_FAILED, CLEAR_ERRORS, USER_LOADED, AUTH_ERRORS, LOGIN_FAILED, LOGIN_SUCCESS, LOG_OUT } from "../types";

export default (state, action) => {
  switch (action.type) { 
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: action.payload
      }
    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case LOG_OUT: 
    case AUTH_ERRORS:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
        user: null,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      }
    default:
      return state;
  }
}