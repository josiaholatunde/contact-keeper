import React from 'react';
import {useReducer} from 'react';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import axios from 'axios';
import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER, CONTACT_ERROR, GET_CONTACTS, CLEAR_CONTACTS, CLEAR_ERRORS } from '../types';
import setAuthToken from '../../utils/setAuthToken';
const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true,
  }

  const [state, dispatch ] =  useReducer(ContactReducer, initialState);


  //Get Contacts
  const getContacts = async () => {
    setAuthToken(localStorage.token)
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      try {
        const response = await axios.get('/api/contacts', config);
        dispatch({type: GET_CONTACTS, payload: response.data});
      } catch (error) {
        dispatch({type: CONTACT_ERROR, payload:  error.response.data.msg});
      }
    }

  //Add COntact

  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    try {
      const response = await axios.post('/api/contacts', contact, config);
      dispatch({type: ADD_CONTACT, payload: response.data});
    } catch (error) {
      dispatch({type: CONTACT_ERROR, payload: error.response.data.msg});
    }
  }
  //Delete Contact
  const deleteContact = async id => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      await axios.delete(`/api/contacts/${id}`, config);
      dispatch({type: DELETE_CONTACT, payload: id});
    } catch (error) {
      dispatch({type: CONTACT_ERROR, payload: error.response.data.msg});
    }
  }
  //Set CUrrent Contact
  const setCurrent = contact => {
    dispatch({type: SET_CURRENT, payload: contact});
  }
  //Update Contact
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    const contactId = contact.get('id');
    try {
      const response = await axios.put(`/api/contacts/${contactId}`, contact, config);
      dispatch({type: UPDATE_CONTACT, payload: response.data});
    } catch (error) {
      dispatch({type: CONTACT_ERROR, payload: error.response.data.msg});
    }
  }
  //CLear Contacts
  const clearContacts = () => {
    dispatch({type: CLEAR_CONTACTS});
  }
  //Clear CUrrent Contact
  const clearCurrent = () => {
    dispatch({type: CLEAR_CURRENT});
  }
  //Filter COntact
  const filterContact = text => {
    dispatch({type: FILTER_CONTACTS, payload: text})
  }
  //CLear Filter
  const clearFilter = () => {
    dispatch({type: CLEAR_FILTER})
  }

  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };


  return <ContactContext.Provider value={
    {
      contacts: state.contacts,
      error: state.error,
      current: state.current,
      addContact,
      loading: state.loading,
      filtered: state.filtered,
      deleteContact,
      setCurrent,
      clearCurrent,
      updateContact,
      filterContact,
      clearFilter,
      getContacts,
      clearContacts,
      clearErrors
    }
  }>
  {props.children}
  </ContactContext.Provider>
}

export default ContactState;