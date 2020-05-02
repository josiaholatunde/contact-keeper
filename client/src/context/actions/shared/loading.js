import { SET_LOADING } from "../../types"

 //Set Loading
 export const setLoading = (payload) => {
    return {
        type: SET_LOADING, 
        payload
    }
}
 