const contactBtn = document.querySelector('.contact-button');
const closeBtnContactForm = document.querySelector('.close-contact-from');


const modal = document.getElementById("contact_modal");

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