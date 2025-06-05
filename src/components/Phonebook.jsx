import { nanoid } from 'nanoid'
import { PhoneList } from './PhoneList'
import './phonebook.css'
import { FaRegAddressBook } from "react-icons/fa";
import { useState, useEffect, Fragment } from 'react'
export const Phonebook = () => {
    const [name, setName] = useState(() => {
        return localStorage.getItem("namePhone") || "";
    })
    const [number, setNumber] = useState(() => {
        return localStorage.getItem("numberPhone") || "";
    })
    const [filter, setFilter] = useState(() => {
        return localStorage.getItem("filter") || ""
    })
    const [contacts, setContacts] = useState(() => {
         const savedContacts = localStorage.getItem("contactPhone");
    if (savedContacts) {
        return JSON.parse(savedContacts);
    }
    return [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }
    ];
    })
    useEffect(() => {
        localStorage.setItem("namePhone", name)
        localStorage.setItem("numberPhone", number)
        localStorage.setItem("filter", filter)
        localStorage.setItem("contactPhone", JSON.stringify(contacts))
    }, [name, number, contacts, filter])
    const handleNameInput = (e) => {
        setName(e.target.value)
    }
    const handleNumberInput = (e) => {
        setNumber(e.target.value)
    }
    const deleteContact = (id) => {
        const searchContact = contacts.filter(contact => contact.id !== id)
        setContacts(searchContact)
    }
    const searchByName = (e) => {
        setFilter(e.target.value)
    }
    const handleAddContact = () => {
        if (!name.trim() || !number.trim()) {
            alert("Заповніть поля !")
            return;
        }
        if (contacts.some(contact => contact.name === name)) {
            alert("Цей контакт існує")
            return;
        }
        const update = [...contacts, { id: nanoid(), name: name, number: number }]
        setContacts(update)
        setName("")
        setNumber("")
    }
    const filteredName = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
    return (
        <Fragment>
            <form onSubmit={(e) => { e.preventDefault() }}>
                <h1>Name</h1>
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    placeholder="Name"
                    onChange={handleNameInput}
                    value={name}
                    className='inputForm'
                />
                <h1>Number</h1>
                <input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    placeholder="Number"
                    onChange={handleNumberInput}
                    value={number}
                    className='inputForm'
                />
                <button onClick={(e) => { e.preventDefault(); handleAddContact() }} className="btnAddContact">Add contact <FaRegAddressBook /> </button>
            </form>
            <div className='containerFilter'>
                <h1>Filter</h1>
                <input type="text" placeholder="filter" onChange={searchByName} value={filter} className='inputForm' />
            </div>
            <PhoneList listPhone={filteredName} deleteBtn={deleteContact} />
        </Fragment>
    )
}