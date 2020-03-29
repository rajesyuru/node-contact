let idSelected = null;

const getCard = (contact) => {
    let card = document.createElement('div');
    card.dataset.id = contact.id;
    card.classList.add('card');
    card.classList.add('mb-2');

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let contactName = document.createElement('h5');
    contactName.id = 'contact-name';
    contactName.innerText = contact.name;

    cardBody.append(contactName);

    let contactPhone = document.createElement('p');
    contactPhone.id = 'contact-phone';
    contactPhone.innerText = contact.phone;

    cardBody.append(contactPhone);

    let contactAddress = document.createElement('p');
    contactAddress.id = 'contact-address';
    contactAddress.innerText = contact.address;

    cardBody.append(contactAddress);

    let editButton = document.createElement('a');
    editButton.href
    editButton.classList.add('btn');
    editButton.classList.add('btn-primary');
    editButton.innerHTML = `<span class="material-icons text-light" style="font-size: 20px;">
    create
    </span>`;

    cardBody.append(editButton);

    editButton.addEventListener('click', (e) => {
        e.preventDefault();

        document.getElementById('name').value = contact.name;
        document.getElementById('phone').value = contact.phone;
        document.getElementById('address').value = contact.address;

        idSelected = contact.id;
    })

    let deleteButton = document.createElement('a');
    deleteButton.classList.add('btn');
    deleteButton.classList.add('btn-danger');
    deleteButton.innerHTML = `<span class="material-icons text-light" style="font-size: 20px;">
    delete
    </span>`;

    deleteButton.addEventListener('click', (e) => {
        e.preventDefault();

        if (confirm('Are you sure you want to delete this contact?')) {
            fetch(`/delete/${contact.id}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'success') {
                            card.remove();
                        } else {
                            alert(data.message);
                        }
                    })
                    .catch(err => console.log(err))
        }
    })

    cardBody.append(deleteButton);

    card.append(cardBody);

    return card;
}

document.getElementById('form-contact').addEventListener('submit', (e) => {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;

    if (idSelected !== null) {
        fetch(`/edit-contact/${idSelected}`, {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                phone: phone,
                address: address,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const card = document.querySelector(`[data-id="${idSelected}"]`);
    
                    if (card) {
                        card.querySelector('#contact-name').innerText = data.data.name;
                        card.querySelector('#contact-phone').innerText = data.data.phone;
                        card.querySelector('#contact-address').innerText = data.data.address;
                    }
    
                    document.getElementById('form-contact').reset();
                    idSelected = null;
                } else {
                    alert(data.message);
                }
            })
    } else {
        fetch('/add-contact', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                phone: phone,
                address: address,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const elContent = document.getElementById('content');

                elContent.prepend(getCard(data.data));

                document.getElementById('form-contact').reset();
            } else {
                alert(data.message);
            }
        });
    }
})

fetch('/contact')
    .then(response => response.json())
    .then(data => {
        const elContent = document.getElementById('content');

        data.forEach(contact => {
            elContent.prepend(getCard(contact));
        });
    })
    .catch(error => console.log(error));

