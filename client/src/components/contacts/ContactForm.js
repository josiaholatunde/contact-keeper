import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/ContactContext';
const ContactForm = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });
  const contactContext = useContext(ContactContext);

  const { addContact, current, clearCurrent, updateContact }  = contactContext;

  const {name, email, phone, type} = contact;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    }else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [contactContext, current]);

  const onChange = ({target}) => setContact({...contact, [target.name]: target.value});

  const clearAll = () => {
    clearCurrent();
  }
  const handleSubmit = e => {
    e.preventDefault();
    if (!current) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'Personal'
    });
    clearAll();
  }
  return (
    <div>
      <h2 className="text-primary">{!current ? 'Add' : 'Edit'} Contact</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="name" placeholder="Name" value={name}  onChange={onChange}/>
        <input type="email" name="email" id="email" placeholder="email" value={email} onChange={onChange}/>
        <input type="text" name="phone" id="phone" placeholder="Phone" value={phone} onChange={onChange}/>
        <h5>Contact Type</h5>
        <input type="radio" name="type"  placeholder="Contact Type" value='Personal' onChange={onChange} 
         checked={type === 'Personal'} /> Personal {' '}
        <input type="radio" name="type" placeholder="Contact Type" value='Professional'
        checked={type === 'Professional'} onChange={onChange} /> Professional
        <div className="submit">
          <button className="btn btn-primary">{!current ? 'Add' : 'Edit'}</button>
        </div>
        {current && (
          <div className="my-1">
            <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
          </div>
        )}
      </form>
    </div>
  )
}

export default ContactForm;
