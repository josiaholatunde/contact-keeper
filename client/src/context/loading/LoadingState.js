import React, {useReducer} from 'react';
import LoadingReducer from './LoadingReducer'
import LoadingContext from './LoadingContext'
import { SET_LOADING } from '../types';

const LoadingState = props => {
  const initialState = null;

  const [state, dispatch ] = useReducer(LoadingReducer, initialState);

   //Set Loading
 const setLoading = (payload) => {

    dispatch({
        type: SET_LOADING, 
        payload
    })
  }
 

  return <LoadingContext.Provider value={{
    loading: state,
    setLoading
  }}>
  {props.children}
  </LoadingContext.Provider>
}


export default LoadingState;