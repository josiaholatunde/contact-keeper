import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => {

    return ( <Fragment>
        <img src={spinner} alt='Loading...' style={{width: '100%', objectFit: 'contain', height: '60vh', margin: 'auto', display: 'block'}} />
        </Fragment>)
}
     
  
export default Spinner;