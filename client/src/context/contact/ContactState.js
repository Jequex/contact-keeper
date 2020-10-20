import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_CONTACTS,
    FILTER_CONTACTS,
    CONTACT_ERROR,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts : null,
        current: null,
        filtered: null,
        error: null,
        loading: true
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Get contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');

            dispatch({type: GET_CONTACTS, payload: res.data})
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    }

    //Add contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);

            dispatch({type: ADD_CONTACT, payload: res.data})
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    }

    //Delete contact
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`);

            dispatch({type: DELETE_CONTACT, payload: id})
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    }

    //update contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);

            dispatch({type: UPDATE_CONTACT, payload: res.data})
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    }

    //Clear contacts
    const clearContacts = () => {
        dispatch({type: CLEAR_CONTACTS})
    }

    //Set current contact
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact})
    }

    //clear current contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT})
    }

    //filter contacts
    const filterContacts = text => {
        dispatch({type: FILTER_CONTACTS, payload: text})
    }

    //clear filter
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER})
    }

    return (
        <ContactContext.Provider
        value = {{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                clearContacts,
                getContacts,
                addContact,
                updateContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                filterContacts,
                clearFilter
        }}
        >
            {props.children}
        </ContactContext.Provider>
    )


}


export default ContactState;