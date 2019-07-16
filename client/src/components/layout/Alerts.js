import React, {useContext} from 'react'
import AlertContext from '../../context/alert/AlertContext';
const Alerts = () => {
  const alertContext = useContext(AlertContext);

  const { alerts } = alertContext;
  return (
    alerts.length > 0 && (
      alerts.map(({id, type, msg}) => (
        <div key={id} className={`alert alert-${type}`}>
          <i className="fa fa-info-circle"></i>
          {msg}
        </div>
      ))
    )
  )
}

export default Alerts
