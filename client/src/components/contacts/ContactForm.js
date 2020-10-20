import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import AlertContext from '../../context/alert/alertContext'

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const alertContext = useContext(AlertContext);

    const { addContact, current, clearCurrent, updateContact } = contactContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        if (current !== null) {
            setContact(current)
        } else {
            setContact({name: '', email: '', phone: '', type: 'personal'})
        }
    }, [contactContext, current])

    const [contact, setContact] = useState({
        name: '', email: '', phone: '', type: 'personal'
    });

    const { name, email, phone, type } = contact;

    const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value })
    
    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            addContact(contact);
            setAlert('Contact Added', 'success')
        } else {
            updateContact(contact);
            setAlert('Contact Updated', 'success')
        }
        clearAll()
    }

    const clearAll = () => {
        clearCurrent()
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type='text' placeholder='Name' name='name' value={name} onChange={onChange} />
            <input type='email' placeholder='Email' name='email' value={email} onChange={onChange} />
            <input type='text' placeholder='Phone' name='phone' value={phone} onChange={onChange} />
            <h5>Contact Type</h5>
            <input type='radio' name='type' value='personal' checked={type === 'personal'} onChange={onChange} />Personal{' '}
            <input type='radio' name='type' value='professional' checked={type === 'professional'} onChange={onChange} />Professional
            <div>
                <input type='submit'
                    value={current ? 'Update Contact' : 'Add Contact'}
                    className='btn btn-block btn-primary' />
            </div>
            {current && (<div>
                <button className="btn btn-dark btn-block" onClick={clearAll}>Clear</button>
            </div>)}
        </form>
    )
}

export default ContactForm