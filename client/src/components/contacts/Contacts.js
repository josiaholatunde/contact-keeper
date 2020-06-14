import React, { useContext, Fragment, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";
import ContactsFilter from "./ContactsFilter";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AlertContext from "../../context/alert/AlertContext";
import Spinner from "../layout/Spinner";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  let { contacts, filtered, getContacts, error, loading, clearErrors } = contactContext;

  const alertContext = useContext(AlertContext);
  let { setAlert } = alertContext;

  useEffect(() => {
    getContacts();
    if (error) {
      setAlert(error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, []);

  const displayContacts = (contacts) => {
    if (contacts && contacts.length === 0) {
      return (
        <Fragment>
          <h4 className="no-results">No contacts were found </h4>
        </Fragment>
      );
    }
    return (
      <TransitionGroup>
        {contacts && contacts.map((contact) => (
          <CSSTransition key={contact._id} timeout={500} classNames="item">
            <ContactItem contact={contact} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  };

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4 style={addContactStyle}>Please add a Contact!</h4>;
  }
  if (filtered) {
    contacts = filtered;
  }

  return loading ? <Spinner /> : <Fragment> 
    <ContactsFilter />
    { displayContacts(contacts)  }
     </Fragment>;
};

const addContactStyle = {
  marginTop: ".7rem",
};

export default Contacts;
