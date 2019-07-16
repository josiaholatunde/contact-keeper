import React, { useContext, Fragment, useEffect } from 'react'
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';
import ContactsFilter from './ContactsFilter';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import AlertContext from '../../context/alert/AlertContext';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  let { contacts, filtered, getContacts, error, loading } = contactContext;

  const alertContext = useContext(AlertContext);
  let { setAlert } = alertContext;

  useEffect(() => {
    getContacts();
    if (error) {
      setAlert(error, 'danger');
    }
    //eslint-disable-next-line
  }, []); 
  if (filtered) {
    contacts = filtered;
  }

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a Contact!</h4>
  }

  return (
    <Fragment>
        <TransitionGroup>
          <ContactsFilter />
          {contacts !== null && !loading ? (contacts.map(contact => (
            <CSSTransition key={contact._id} timeout={500} classNames='item'>
              <ContactItem  contact={contact} />
            </CSSTransition>
          ))): (
            <Spinner />
          )}
        </TransitionGroup>
    </Fragment>
  )
}



export default Contacts
