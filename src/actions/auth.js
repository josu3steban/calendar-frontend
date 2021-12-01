import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch"
import { types } from "../types/types";


export const startLogin = ( email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchWithoutToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();
        
        if( body.ok ) {
            localStorage.setItem( 'token', body.token );
            dispatch( login( { uid: body.uid, name: body.name } ) );
        } else {
            Swal.fire( 'Error', body.message, 'error' );
        }

    }
}

export const startRegister = ( email, name, password) => {
    return async( dispatch ) => {

        const resp = await fetchWithoutToken( 'auth/register', { name, email, password }, 'POST' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem( 'token', body.token );
            dispatch( login( { uid: body.uid, name: body.name } ) );
        } else {
            Swal.fire( 'Error', body.message, 'error' );
        }
        
    }
}

export const startChecking = ( ) => {
    return async( dispatch ) => {

        const resp = await fetchWithToken( 'auth/validate', 'GET' );
        const body = await resp.json();

        console.log(body);

        if( body.ok ) {
            localStorage.setItem( 'token', body.token );
            dispatch( login( { uid: body.uid, name: body.name } ) );
        } else {
            Swal.fire( 'Error', body.message, 'error' );
            dispatch( startFinishChecking() );
            
        }
        
    }
}

const startFinishChecking = () => {
    return {
        type: types.authFinishChecking
    }
}

const login = ( user ) => {

    return {
        type: types.authLogin,
        payload: user
    }
    
}

export const startLogout = () => {
    return( dispatch ) => {

        localStorage.clear();
        dispatch( logout() );
            
    }
}

const logout = () => {
    return {
        type: types.authLogout
    }
}