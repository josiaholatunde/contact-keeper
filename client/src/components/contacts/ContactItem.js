import React, {useContext} from 'react'
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/ContactContext';
const ContactItem = ({contact}) => {
   const contactContext = useContext(ContactContext);
   const { deleteContact, clearCurrent, setCurrent } = contactContext;

   const { _id, name, email, phone, type} = contact;

   const handleDelete = () => {
     deleteContact(_id);
     clearCurrent();
   }
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '} 
        <span 
          className={`badge ${type === 'Personal'? 'badge-primary': 'badge-success'}`}
        >{`${type.charAt(0)}${type.slice(1)}`}</span>
      </h3>
      <ul className="list">
        {email && (<li>
          <i className="fa fa-envelope-open"></i> {email}
          </li>)}
        {phone && (<li>
          <i className="fa fa-phone"></i> {phone}
          </li>)}
      </ul>
      <p>
        <button className="btn btn-sm btn-dark" onClick={() => setCurrent(contact)}>Edit</button>
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>Delete</button>
      </p>
    </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
}

export default ContactItem
