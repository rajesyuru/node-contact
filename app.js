const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.send('');
});

app.post('/add-contact', (req, res) => {
    if (req.body.name.trim().length === 0) {
        res.send({
            status: 'error',
            message: 'Fill in the blanks'
        });
    } else if (req.body.phone.trim().length === 0) {
        res.send({
            status: 'error',
            message: 'Fill in the blanks'
        });
    } else if (req.body.address.trim().length === 0) {
        res.send({
            status: 'error',
            message: 'Fill in the blanks'
        });
    } else {
        let data = db.addContact(req.body);

        res.send({
            status: 'success',
            data: data,
        });
    }
});

app.get('/contact', (req, res) => {
    res.send(db.loadContacts());
});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;

    const result = db.deleteContacts(id);

    if (result) {
        res.send({
            status: 'success'
        });
    } else {
        res.send({
            status: 'error',
            message: 'Contact is not found'
        });
    }
});

app.post('/edit-contact/:id', (req, res) => {
    if (req.body.name.trim().length === 0) {
        res.send({
            status: 'error',
            message: 'Fill in the blanks'
        });
    } else if (req.body.phone.trim().length === 0) {
        res.send({
            status: 'error',
            message: 'Fill in the blanks'
        });
    } else if (req.body.address.trim().length === 0) {
        res.send({
            status: 'error',
            message: 'Fill in the blanks'
        });
    } else {
        const result = db.editContact(req.params.id, req.body);

        if (result) {
            res.send({
                status: 'success',
                data: result
            });
        } else {
            res.send({
                status: 'error',
                message: 'Contact is not found'
            });
        }
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server berhasil jalan di port ${port}`);
});
