import { types } from "../types/types"

const initialState = {
    checking: true,
    // uid: null,
    // name: null
}

export const AuthReducer = ( state=initialState, action) => {

    switch( action.type ) {

        case types.authLogin:
            return {
                ...state,
                checking: false,
                ...action.payload
            }

        case types.authFinishChecking:
            return {
                ...state,
                checking: false
            }

        case types.authLogout:
            return {
                checking: false
            }
        
        default:
            return state
        
    }
    
}