import React, {useRef, useContext, useEffect} from 'react'
import ContactContext from '../../context/contact/ContactContext';
const ContactsFilter = () => {
  const filterVal = useRef('');
  const contactContext = useContext(ContactContext);
  const {filterContact, filtered, clearFilter} = contactContext;

  useEffect(() => {
    if (filtered == null) {
      filterVal.current.value = '';
    }
  })

  const onChange = ({target}) => {
    if (filterVal.current.valueOf() !== target.value) {
      filterContact(target.value);
    } else {
      clearFilter();
    }
  }
  return (
    <form>
        <input ref={filterVal} type="text" name="filter" id="filter" onChange={onChange}/>
        {filtered &&  (<div><button type="button" className="btn btn-block btn-light" onClick={() => clearFilter()}>Clear</button></div>)}
    </form>
  )
}

export default ContactsFilter
