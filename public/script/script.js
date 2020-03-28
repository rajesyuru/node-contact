const getCard = (contact) => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('mb-2');

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    cardBody.innerHTML = `<h5>${contact.name}</h5>`;
    cardBody.innerHTML += `<p>${contact.phone}</p>`;
    cardBody.innerHTML += `<p>${contact.address}</p>`;

    card.append(cardBody);

    return card;
}

fetch('/contact')
    .then(response => response.json())
    .then(data => {
        const elContent = document.getElementById('content');

        data.forEach(contact => {
            elContent.prepend(getCard(contact));
        });
    })
    .catch(error => console.log(error));

