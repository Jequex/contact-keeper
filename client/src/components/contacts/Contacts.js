import React, { useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();
        //eslint-disable-next-line
    }, [])

    if (contacts !== null && contacts.length === 0) {
        return (<h4 className="text-danger">please create a contact</h4>)
    }

    return (
        <div style={{ overflow: 'scroll', maxHeight: '600px' }}>
            {contacts !== null && !loading ? (filtered !== null ?
                filtered.map(contact => (<ContactItem contact={contact} key={contact._id} />)) :
                contacts.map(contact => (<ContactItem contact={contact} key={contact._id} />))
            ) : (<Spinner />)
            }
        </div>
    )
}

export default Contacts
