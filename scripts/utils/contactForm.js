const contactBtn = document.querySelector('.contact-button');
const closeBtnContactForm = document.querySelector('.close-contact-from');

const modal = document.getElementById("contact_modal");


const contactForm = document.querySelector('form');
contactForm.addEventListener('submit', formSubmit);

function formSubmit(e) {
    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const email = document.querySelector('#email');
    const message = document.querySelector('#message');

    e.preventDefault();

    const formData = [];
    const errorsForm = [];
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


    if (firstName.value.length !== 0) {
        formData.push(firstName.value);
    } else {
        errorsForm.push("Le prénom saisi est invalide");
    }

    if (lastName.value.length !== 0) {
        formData.push(lastName.value);
    } else {
        errorsForm.push("Le nom saisi est invalide");
    }

    if (email.value.match(emailRegex)) {
        formData.push(email.value);
    } else {
        errorsForm.push("L'adresse email saisie est invalide");
    }

    if (message.value.length !== 0) {
        formData.push(message.value);
    } else {
        errorsForm.push("Veuillez entrer un message");
    }


    if (errorsForm.length == 0) {
        console.log(formData);
    } else {
        console.log(errorsForm);
    }

}



function displayModal() {
	modal.style.display = "flex";

    document.querySelector('#main').setAttribute('aria-hidden', true);
    modal.setAttribute('aria-hidden', false);

    closeBtnContactForm.focus();
}

function closeModal() {
    modal.style.display = "none";

    document.querySelector('#main').setAttribute('aria-hidden', false);
    modal.setAttribute('aria-hidden', true);

    contactBtn.focus();
}


document.addEventListener('keydown', function(e) {
    if (modal.getAttribute('aria-hidden') == 'false' && e.keyCode === 27) {
        closeModal();
    }
})

// document.querySelector('.contact-button').addEventListener('click', displayModal);

export { displayModal, closeModal }