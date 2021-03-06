import React, {useEffect, useContext} from 'react'
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import AuthContext from '../../context/auth/AuthContext';
const Home = () => {
  const authContext = useContext(AuthContext);
  const { loadUser }  = authContext;

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, [])
  return (
    <div className="grid-2 mt-3">
       <div><ContactForm /></div>
       <div>
          <Contacts />
       </div>
    </div>
  )
}

export default Home
