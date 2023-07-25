const contactBtn = document.querySelector('.contact-button');
const closeBtnContactForm = document.querySelector('.close-contact-from');

const modal = document.getElementById("contact_modal");
// const main = document.getElementById("main");

function displayModal() {
	modal.style.display = "flex";

    main.setAttribute('aria-hidden', true);
    modal.setAttribute('aria-hidden', false);

    closeBtnContactForm.focus();
}

function closeModal() {
    modal.style.display = "none";

    main.setAttribute('aria-hidden', false);
    modal.setAttribute('aria-hidden', true);

    contactBtn.focus();
}


document.addEventListener('keydown', function(e) {
    if (modal.getAttribute('aria-hidden') == 'false' && e.keyCode === 27) {
        console.log('Fermeture');
        closeModal();
    }
})