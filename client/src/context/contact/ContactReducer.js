import { GET_CONTACT, ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, FILTER_CONTACTS, CLEAR_FILTER, CONTACT_ERROR, GET_CONTACTS, CLEAR_CONTACTS, CLEAR_ERRORS } from "../types";


export default (state, action) => {
  switch (action.type) {
    case GET_CONTACT:
      return {
        contact: state.contacts.find(({_id}) => _id === action.payload._id)
      }
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      }
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload: contact)
      }
    case DELETE_CONTACT: 
      return {
        ...state,
        contacts: state.contacts.filter(({_id}) => _id !== action.payload)
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
      case FILTER_CONTACTS:
        return {
          ...state,
          filtered: state.contacts.filter(contact => {
            const regex = new RegExp(`${action.payload}`, 'gi');
            return contact.name.match(regex) || contact.email.match(regex);
          })
        }
      case CLEAR_FILTER: 
        return {
          ...state,
          filtered: null
        }
      case CONTACT_ERROR:
        return {
          ...state,
          error: action.payload
        }
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null
          }
      case GET_CONTACTS: 
        return {
          ...state,
          contacts: action.payload,
          loading: false
        }
      case CLEAR_CONTACTS:
        return {
          ...state,
          contacts: null,
          filtered: null,
          current: null,
          error: null
        }
    default:
      return state;
  }
}