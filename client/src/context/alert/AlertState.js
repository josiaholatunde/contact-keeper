import React, {useReducer} from 'react';
 import AlertReducer from './AlertReducer';
 import AlertContext from './AlertContext';
import { SET_ALERT, CLEAR_ALERT } from '../types';
import uuid from 'uuid';

const AlertState = props => {
  const initialState = [];

  const [state, dispatch ] = useReducer(AlertReducer, initialState);


 //Set Alert
 const setAlert = (msg, type) => {
   const id = uuid.v4();
   dispatch({type: SET_ALERT, payload: {
     msg, type, id
   }})
   setTimeout(() => dispatch({type: CLEAR_ALERT, payload: id}), 5000);
 }

  return <AlertContext.Provider value={{
    alerts: state,
    setAlert
  }}>
  {props.children}
  </AlertContext.Provider>
}


export default AlertState;