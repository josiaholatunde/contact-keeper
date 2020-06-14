import React, { useState, useContext, useEffect, useRef } from 'react'
import ContactContext from '../../context/contact/ContactContext';
import AlertContext from '../../context/alert/AlertContext'

import validateEmail from '../../utils/isEmailValid'
const ContactForm = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });
  const [error, setError] = useState({
    email : ''
  });
  const [imagePreview, setImagePreview] = useState('')
  const [userProfileImage, setUserProfileImage] = useState('')

  const contactContext = useContext(ContactContext);
  const alertContext = useContext(AlertContext);
  const userImage = useRef()
  const {  setAlert } = alertContext;

  const { addContact, current, clearCurrent, updateContact, error:contactError }  = contactContext;

  const {name, email, phone, type} = contact;

  useEffect(() => {
    if (contactError) {
      setAlert(contactError, 'danger');
    }
    if (current !== null) {
      setContact(current);
      setImagePreview(current.displayImageUrl);
    }else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
    //eslint-disable-next-line
  }, [contactContext, current, contactError]);

  const onChange = ({target}) => {
    if (target.name === 'email') {
      const email = target.value;
      if (!validateEmail(email)) {
        setError({
          email: 'Invalid Email'
        })
      } else {
        setError({
          email: ''
        })
      }
    } 
    setContact({...contact, [target.name]: target.value});
  }

  const clearAll = () => {
    clearCurrent();
    setImagePreview('')
    setUserProfileImage('')
  }

  const isFormValid = () => {
    return name && name.trim().length > 0 && email && email.trim().length > 0
    && phone && phone.trim().length > 0 && type;
  }

  const uploadImage = ({ target: { files } }) => {
    const userImage = files[0]
    setUserProfileImage(userImage);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(userImage)
    fileReader.onload = (event) => {
      const imagePreview = event.target.result;
      setImagePreview(imagePreview);
    }
  }

 

  const handleSubmit = e => {
    e.preventDefault();

    if (!isFormValid()) {
      const errorMessage = 'One or more fields are invalid';
      setAlert(errorMessage, 'danger')
    } else {
      const contactFormData = new FormData();
      contactFormData.append('name', contact.name)
      contactFormData.append('email', contact.email)
      contactFormData.append('phone', contact.phone)
      contactFormData.append('type', contact.type)
      contactFormData.append('image', userProfileImage)
      if (!current) {
        addContact(contactFormData);
      } else {
        contactFormData.append('id', contact._id)
        updateContact(contactFormData);
      }
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'Personal'
      });
      setImagePreview('')
      setUserProfileImage('')
      clearAll();
    }
    
  }
  return (
    <div>
      <h2 className="text-primary">{!current ? 'Add' : 'Edit'} Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className='mt-3 form-group'>
        <input type="text" name="name" id="name" placeholder="Name" value={name}  onChange={onChange}/>
        </div>
        <div className='mt-3 form-group'>
          <input type="email" name="email" id="email" placeholder="Email" value={email} onChange={onChange}/>
          { error && error.email && <span className='text-error mt-n2'> { error.email} </span>}
        </div>
        <div className='mt-3 form-group'>
        <input type="text" name="phone" id="phone" placeholder="Phone" value={phone} onChange={onChange}/>

        </div>
       <div className='mt-3'>
       <h4>Contact Type</h4>
        <input type="radio" name="type" className='radio'  id='personal' placeholder="Contact Type" value='Personal' onChange={onChange} 
         checked={type === 'Personal'} /> <label htmlFor='personal' className='pointer ml-2'>Personal {' '}</label>
        <input type="radio" name="type"  id='professional' className='ml-3 radio' placeholder="Contact Type" value='Professional'
        checked={type === 'Professional'} onChange={onChange} /> 
        <label htmlFor='professional' className='pointer ml-2'>Professional</label>
       </div>

       <div>
         <h4 className='mt-3'>Upload Contact Image <span className='text-error'>* optional</span></h4>
         <div className='upload-container text-grey-light justify-content-center mt-3'> 
            <i className='fa fa-plus fa-2x pointer upload-icon' onClick={() => userImage.current.click()}></i>
            {
              imagePreview && <img src={imagePreview} alt='User profile' className='user-profile-preview' />
            }
         </div>
         <input type='file' className='visibilty-0' ref={userImage} accept='image/*' alt='upload user profile' onChange={uploadImage} />
       </div>

        <div className="submit mt-2">
          <button className="btn btn-primary btn-block">{!current ? 'Add' : 'Edit'}</button>
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
