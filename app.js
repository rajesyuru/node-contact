const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.send('');
});

app.post('/add-contact', (req, res) => {
    db.addContact(req.body);

    res.redirect('/');
});

app.get('/contact', (req, res) => {
    res.send(db.loadContacts());
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server berhasil jalan di port ${port}`);
});
