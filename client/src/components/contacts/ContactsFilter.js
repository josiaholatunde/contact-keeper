import React, {useRef, useContext, useEffect} from 'react'
import ContactContext from '../../context/contact/ContactContext';
import './Contacts.scss'
const ContactsFilter = () => {
  const filterVal = useRef('');
  const contactContext = useContext(ContactContext);
  const {filterContact, filtered, clearFilter} = contactContext;

  useEffect(() => {
    if (filtered == null) {
      filterVal.current.value = '';
    }
  }, [filtered])

  const onChange = ({target}) => {
    if (filterVal.current.valueOf() !== target.value) {
      filterContact(target.value);
    } else {
      clearFilter();
    }
  }
  return (
    <form>
        <div className='search-box-container'>
          <input ref={filterVal} type="text" name="filter" id="filter" className='filter-container' onChange={onChange}/>
          <i className='fa fa-search fa-2x search-icon'></i>
        </div>
        {filtered &&  (<div><button type="button" className="btn btn-block btn-light" onClick={() => clearFilter()}>Clear</button></div>)}
    </form>
  )
}

export default ContactsFilter
