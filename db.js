const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./storage');

const uuid = require('uuid/v4');

getContacts = () => {
    let contacts = JSON.parse(localStorage.getItem('contacts'));

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
};

exports.loadContacts = () => {
    return getContacts();
};

