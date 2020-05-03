import React, {useContext} from 'react'
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/ContactContext';
import defaultPhoto from '../../assets/photo.png'
const ContactItem = ({contact}) => {
   const contactContext = useContext(ContactContext);
   const { deleteContact, clearCurrent, setCurrent } = contactContext;

   const { _id, name, email, phone, type, displayImageUrl } = contact;

   const handleDelete = () => {
     deleteContact(_id);
     clearCurrent();
   }
  return (
    <div className="card bg-light d-flex">
      <div className='photo-container'>
        <img src={displayImageUrl || defaultPhoto} className='img-fluid display-img' alt='Contact' />
      </div>
      <div className='contact-details'>
      <h3 className="text-primary text-left user-name">
        {name}{' '} 
        <span 
          className={`badge ${type === 'Personal'? 'badge-primary': 'badge-success'}`}
        >{`${type.charAt(0)}${type.slice(1)}`}</span>
      </h3>
      <ul className="list">
        {email && (<li>
          <a href={`mailto:${email}`} className='user-email'>
            <i className="fa fa-envelope-open"></i> {email}
          </a>
          </li>)}
        {phone && (<li className='user-phone'>
          <i className="fa fa-phone"></i> {phone}
          </li>)}
      </ul>
      <p>
        <button className="btn btn-sm btn-dark" onClick={() => setCurrent(contact)}>
          <i className='fa fa-pencil mr-1'></i>
          <span>Edit</span>
        </button>
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>
        <i className='fa fa-trash mr-1'></i>
          Delete
          </button>
      </p>
      </div>
    </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
}

export default ContactItem
