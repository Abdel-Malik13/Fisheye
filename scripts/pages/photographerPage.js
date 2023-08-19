import { getPhotographerById } from "../dataServices/photographerDataService.js";
import { MediaFactory } from "../factories/mediaFactory.js";
import { PhotographerFactory } from "../factories/photographerFactory.js";
import { closeModal } from "../utils/contactForm.js";

const lightbox = document.querySelector('.lightbox-bg');
const closeLightboxBtn = document.querySelector('.close-lightbox');
const previousLightboxSlide = document.querySelector('.previous-slide');
const nextLightboxSlide = document.querySelector('.next-slide');
const slideImg = document.querySelector('.slide-img > img');
const slideVideo = document.querySelector('.slide-img > video');
let linkPicturesSelect = [];
const main = document.querySelector('#main');
const lightboxTitle = document.querySelector('.lightbox-title');
const closeModalBtn = document.querySelector('.close-contact-from');



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



let indexSlidePicture = 0;

function addEventListenerForPictures() {
    linkPicturesSelect = document.querySelectorAll('.link-picture');

    for (let index = 0; index < linkPicturesSelect.length; index++) {
        const link = linkPicturesSelect[index];

        link.addEventListener('click', function(e) {
            e.preventDefault();

            indexSlidePicture = index;

            openLightbox();


            if (this.children[0].tagName === "DIV") {
                slideImg.style.display = "block";
                slideVideo.style.display = "none";
                slideImg.setAttribute('src', this.children[0].children[0].getAttribute('src'));
                slideImg.setAttribute('alt', this.children[0].children[0].getAttribute('alt'));
                lightboxTitle.textContent = this.children[0].children[0].getAttribute('alt');
            } else {
                slideImg.style.display = "none";
                slideVideo.style.display = "block";
                slideVideo.setAttribute('src', this.children[1].getAttribute('src'));
                slideVideo.setAttribute('alt', this.children[1].getAttribute('alt'));
                lightboxTitle.textContent = this.children[1].getAttribute('alt');
            }
        });
    }
}

previousLightboxSlide.addEventListener('click', function() {
    changeSlide(-1);
});

previousLightboxSlide.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        changeSlide(-1);
    }
});

nextLightboxSlide.addEventListener('click', function() {
    changeSlide(1);
});

nextLightboxSlide.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        changeSlide(1);
    }
});

closeLightboxBtn.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        closeLightbox();
    }
})

closeLightboxBtn.addEventListener('click', closeLightbox);

closeModalBtn.addEventListener('click', closeModal);


document.addEventListener('keydown', function(e) {

    if (lightbox.style.display === 'flex') {
        if (e.keyCode === 27) {
            closeLightbox();
        }

        if (e.keyCode === 37) {
            changeSlide(- 1);
        }

        if (e.keyCode === 39) {
            changeSlide(+ 1);
        }
    }

})



function changeSlide(slideDirection) {
    indexSlidePicture = indexSlidePicture + slideDirection;


    if (indexSlidePicture < 0) {
        indexSlidePicture = linkPicturesSelect.length - 1;
    }

    if (indexSlidePicture >= linkPicturesSelect.length) {
        indexSlidePicture = 0;
    }


    if (linkPicturesSelect[indexSlidePicture].children[0].tagName === 'DIV') {
        slideImg.style.display = "block";
        slideVideo.style.display = "none";
        slideImg.setAttribute('src', linkPicturesSelect[indexSlidePicture].children[0].children[0].getAttribute('src'));
        slideImg.setAttribute('alt', linkPicturesSelect[indexSlidePicture].children[0].children[0].getAttribute('alt'));
        lightboxTitle.textContent = linkPicturesSelect[indexSlidePicture].children[0].children[0].getAttribute('alt');
    } else {
        slideImg.style.display = "none";
        slideVideo.style.display = "block";
        slideVideo.setAttribute('src', linkPicturesSelect[indexSlidePicture].children[1].getAttribute('src'));
    }
}

function openLightbox() {
    lightbox.style.display = 'flex';
    main.setAttribute('aria-hidden', true);
    lightbox.setAttribute('aria-hidden', false);
    closeLightboxBtn.focus();
}

function closeLightbox() {
    lightbox.style.display = 'none';
    main.setAttribute('aria-hidden', false);
    lightbox.setAttribute('aria-hidden', true);
}



function getMediasWithSorted(sortBy) {

    let photographerSorted = photographerInformations.medias;

    switch (sortBy) {
        case 'popularity':
            photographerSorted = photographerInformations.medias.sort(function(photo1, photo2) {
                return photo1.likes - photo2.likes;
            });
            break;
        
        case 'date':
            photographerSorted = photographerInformations.medias.sort(function(photo1, photo2) {
                return new Date(photo1.date) - new Date(photo2.date);
            });
            break;

        case 'title':
            photographerSorted = photographerInformations.medias.sort(function(photo1, photo2) {
                return photo1.title.toUpperCase() > photo2.title.toUpperCase() ? 1:-1;
            });
            
            break;
            
            default:
                photographerSorted = photographerInformations.medias.sort(function(photo1, photo2) {
                    return photo1.likes - photo2.likes;
                });
                break;
            }
            
    return photographerSorted;
}

const formSort = document.querySelector('#sort');

formSort.addEventListener('change', function() {

    let picturesPhotographerRefresh = document.querySelector('.pictures-photographer');
    const picturesSorted = getMediasWithSorted(this.value);

    picturesPhotographerRefresh.innerHTML = '';

    MediaFactory.displayUserMedias(picturesSorted);
    addEventListenerForPictures();
})

async function init() {
    // Récupère les datas des photographes
    const userId = (new URL(document.location)).searchParams.get("id");
    photographerInformations = await getPhotographerById(userId);
    document.title = document.title + ' ' + photographerInformations.user.name;
    PhotographerFactory.displayUserBlock(photographerInformations);
    MediaFactory.displayUserMedias(getMediasWithSorted(''));
    addEventListenerForPictures();
}





let photographerInformations = {};
init();