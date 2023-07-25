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
        console.log("firstName success");
        formData.push(firstName.value);
    } else {
        console.log("Le prénom saisi est invalide");
        errorsForm.push("Le prénom saisi est invalide");
    }

    if (lastName.value.length !== 0) {
        console.log("lastName success");
        formData.push(lastName.value);
    } else {
        console.log("Le nom saisi est invalide");
        errorsForm.push("Le nom saisi est invalide");
    }

    if (email.value.match(emailRegex)) {
        console.log("email success");
        formData.push(email.value);
    } else {
        console.log("L'adresse email saisie est invalide");
        errorsForm.push("L'adresse email saisie est invalide");
    }

    if (message.value.length !== 0) {
        console.log("Message success");
        formData.push(message.value);
    } else {
        console.log("Vueillez entrer un message");
        errorsForm.push("Veuillez entrer un message");
    }


    if (errorsForm.length > 0) {
        console.log("Il y a des erreurs dans le formulaire");
    } else {
    }

}

// Get pictures for lightbox


// Lorsque je clique sur une image
// Je veux afficher l'image sur laquelle j'ai cliqué
const lightbox = document.querySelector('.lightbox-bg');
const closeLightboxBtn = document.querySelector('.close-lightbox');
const previousLightboxSlide = document.querySelector('.previous-slide');
const nextLightboxSlide = document.querySelector('.next-slide');
const slideImg = document.querySelector('.slide-img > img');
const slideVideo = document.querySelector('.slide-img > video');
let linkPicturesSelect = [];
const main = document.querySelector('#main');
const lightboxTitle = document.querySelector('.lightbox-title');


let indexSlidePicture = 0;


function addEventListenerForPictures() {
    linkPicturesSelect = document.querySelectorAll('.link-picture');
    console.log(linkPicturesSelect);

    for (let index = 0; index < linkPicturesSelect.length; index++) {
        const link = linkPicturesSelect[index];

        // console.log(link.children[0].children[0]);

        link.addEventListener('click', function(e) {
            e.preventDefault();

            console.log(e.target.getAttribute('alt'));

            indexSlidePicture = index;

            openLightbox();


            if (this.children[0].tagName === "DIV") {
                console.log("Affichage image");
                slideImg.style.display = "block";
                slideVideo.style.display = "none";
                // slideImg.setAttribute('src', e.target.children[0].children[0].getAttribute('src'));
                console.log(e.target);
                slideImg.setAttribute('src', this.children[0].children[0].getAttribute('src'));
                slideImg.setAttribute('alt', this.children[0].children[0].getAttribute('alt'));
                lightboxTitle.textContent = this.children[0].children[0].getAttribute('alt');
            } else {
                console.log("Affichage vidéo");
                slideImg.style.display = "none";
                slideVideo.style.display = "block";
                console.log(this.children[1]);
                slideVideo.setAttribute('src', this.children[1].getAttribute('src'));
                slideVideo.setAttribute('alt', this.children[1].getAttribute('alt'));
                lightboxTitle.textContent = this.children[1].getAttribute('alt');
            }
        });
    }
}

previousLightboxSlide.addEventListener('click', function() {
    changeSlide(-1);
    console.log(slideImg.getAttribute('alt'));
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

closeLightboxBtn.addEventListener('click', closeLightbox);

document.addEventListener('keydown', function(e) {

    if (lightbox.style.display === 'flex') {
        if (e.keyCode === 27) {
            console.log('Lightbox close');
            closeLightbox();
        }
    } else {
        console.log('lightbox déjà fermée');
    }

    if (lightbox.style.display === 'flex') {
        if (e.keyCode === 37) {
            console.log('Slide précédente');
            changeSlide(- 1);
        }
    }

    if (lightbox.style.display === 'flex') {
        if (e.keyCode === 39) {
            console.log('Slide suivante');
            changeSlide(+ 1);
        }
    }

})



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

    picturesPhotographerRefresh.innerHTML = '';

    const picturesSorted = getMediasWithSorted(this.value);

    MediaFactory.displayUserMedias(picturesSorted);
    addEventListenerForPictures();
})

async function init() {
    // Récupère les datas des photographes
    const userId = (new URL(document.location)).searchParams.get("id");
    photographerInformations = await getPhotographerById(userId);
    console.log(photographerInformations);
    document.title = document.title + ' ' + photographerInformations.user.name;
    PhotographerFactory.displayUserBlock(photographerInformations);
    MediaFactory.displayUserMedias(getMediasWithSorted(''));
    addEventListenerForPictures();
};


const contactForm = document.querySelector('form');
contactForm.addEventListener('submit', formSubmit);


let photographerInformations = {};
init();