import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartLoaded = ( ) => {
    return async( dispatch ) => {

        try {
            
            const res = await fetchWithToken( 'events' );
            const body = await res.json();
            const events = body.events;
            // console.log(events);
            const prepareEvent = prepareEvents( events );

            if( body.ok ) {

                dispatch( eventLoaded( prepareEvent ) );
            }
            
        }
        catch (error) {

            console.log(error);

        }
    }
}

const eventLoaded = ( event ) => {

    return {
        type: types.eventLoaded,
        payload: event
    }
    
}

export const startEventAddNew = ( event ) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().auth;
        // console.log(event);
        try {

            const res = await fetchWithToken('events', event, 'POST');
            const body = await res.json();

            if( body.ok ) {

                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name
                };

                dispatch( eventAddNew( event ) );
            }

        }
        catch( error ) {
            console.log( error );
        }


    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });

export const eventSartUpdated = ( event ) => {
    return async( dispatch ) => {
        console.log(event);
        try {
    
            const res = await fetchWithToken( `events/${event.id}`, event, 'PUT' );
            const body = await res.json();

            if( body.ok ) {

                dispatch( eventUpdated( event ) );
                
            } else {

                Swal.fire('Error', body.message, 'error');
                
            }
        }
        catch( error ) {
            console.log(error);
        }

    }
}

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartDelete = () => {
    return async( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvent;
        console.log(id);
        try {
    
            const res = await fetchWithToken( `events/${ id }`, {}, 'DELETE' );
            const body = await res.json();

            if( body.ok ) {

                dispatch( eventDeleted( ) );
                
            } else {

                Swal.fire('Error', body.message, 'error');
                
            }
        }
        catch( error ) {
            console.log(error);
        }

    }
}

export const eventDeleted = () => ({ type: types.eventDeleted });


