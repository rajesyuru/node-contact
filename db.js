const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./storage');

const uuid = require('uuid/v4');

getContacts = () => {
    const strContacts = localStorage.getItem('contacts');

    let contacts = null;
    if (strContacts.trim().length > 0) {
        contacts = JSON.parse(strContacts);
    }

    if (contacts === null) {
        contacts = [];

        saveContacts(contacts);
    }

    return contacts;
};

saveContacts = (contacts) => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

exports.addContact = (contact) => {
    let contacts = getContacts();

    contact.id = uuid();

    contacts.push(contact);

    saveContacts(contacts);

    return contact;
};

exports.loadContacts = () => {
    return getContacts();
};

exports.deleteContacts = (id) => {
    let contacts = getContacts();

    if (contacts.findIndex(contact => contact.id === id) < 0) {
        return false;
    } else {
        contacts = contacts.filter(contact => contact.id !== id);

        saveContacts(contacts);

        return true;
    }
}

exports.editContact = (id, data) => {
    let contacts = getContacts();

    if (contacts.findIndex(contact => contact.id === id) < 0) {
        return false;
    } else {
        contacts = contacts.map(contact => {
            if (contact.id === id) {
                contact.name = data.name;
                contact.phone = data.phone;
                contact.address = data.address;
            }

            return contact;
        });

        saveContacts(contacts);

        data.id = id;

        return data;
    }
}

