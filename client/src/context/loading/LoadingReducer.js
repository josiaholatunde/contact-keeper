import { SET_LOADING } from "../types";



export default function(state=null, { type, payload}) {
    switch (type) {
        case SET_LOADING:
            return payload    
        default:
            return state;
    }
}