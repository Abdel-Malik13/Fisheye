class PhotographerFactory {

    static getUserCardDOM(data) {
        const picture = `assets/photographers/${data.portrait}`;
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        const photographerProfile = document.createElement( 'img' );
        const photographerName = document.createElement( 'h2' );
        const photographerLocation = document.createElement('p');
        const photographerDescription = document.createElement('p');
        const photographerTJ = document.createElement('p');

        article.classList.add("photographer-card");

        link.classList.add("card-link");
        link.setAttribute("href", `${"photographer.html?id=" + data.id}`);
        article.appendChild(link);

        photographerProfile.classList.add("photographer-profile");
        photographerProfile.setAttribute("src", picture);
        photographerProfile.setAttribute("alt", "");
        link.appendChild(photographerProfile);

        photographerName.textContent = data.name;
        photographerName.classList.add("photographer-name");
        link.appendChild(photographerName);
        
        photographerLocation.textContent = `${data.city}, ${data.country}`;
        photographerLocation.classList.add("photographer-location");
        article.appendChild(photographerLocation);

        photographerDescription.textContent = data.tagline;
        photographerDescription.classList.add("photographer-description");
        article.appendChild(photographerDescription);

        photographerTJ.textContent = `${data.price}€/jour`;
        photographerTJ.classList.add("photographer-price");
        article.appendChild(photographerTJ);

        return (article);
    }

    static displayUserBlock(data) {
        console.log("getUserPage");

        const photographHeader = document.querySelector('.photograph-header');
        const photographerInformations = document.createElement('article');
        const photographerName = document.createElement('h1');
        const photographerLocation = document.createElement('p');
        const photographerDescription = document.createElement('p');

        const btnModal = document.createElement('button');
        const contactName = document.querySelector('.contact-name');

        const photographImg = document.createElement('article');
        const pictureProfile = document.createElement('img');

        const likesPrice = document.querySelector('.likes-price-photographer');
        const likes = document.createElement('p');
        const likesNumbers = document.createElement('span');
        const heart = document.createElement('i');
        const price = document.createElement('p');


        photographerInformations.classList.add("photograph-informations");
        photographHeader.appendChild(photographerInformations);

        photographerName.classList.add('photographer-name');
        photographerName.textContent = `${data.user.name}`
        photographerInformations.appendChild(photographerName);

        photographerLocation.classList.add('photographer-location');
        photographerLocation.textContent = `${data.user.city}, ${data.user.country}`;
        photographerInformations.appendChild(photographerLocation);

        photographerDescription.classList.add('tagline-description');
        photographerDescription.textContent = `${data.user.tagline}`;
        photographerInformations.appendChild(photographerDescription);


        btnModal.classList.add('contact-button');
        btnModal.setAttribute('onclick', 'displayModal()');
        btnModal.setAttribute('tabindex', '2');
        btnModal.textContent = 'Contactez-moi';
        contactName.textContent = `${data.user.name}`
        photographHeader.appendChild(btnModal);


        photographImg.classList.add('photograph-picture');
        photographHeader.appendChild(photographImg);

        pictureProfile.classList.add('picture-profile');
        pictureProfile.setAttribute('src', `assets/photographers/${data.user.portrait}`);
        pictureProfile.setAttribute('alt', '');

        photographImg.appendChild(pictureProfile);


        // likes.textContent = 
        let heartsUser = 0;
        for (let index = 0; index < data.medias.length; index++) {
            const element = data.medias[index].likes;
            heartsUser += element;
        }

        likes.appendChild(likesNumbers);
        likesNumbers.classList.add('likes');
        likesNumbers.textContent = `${heartsUser}`;
        heart.classList.add('fa-solid');
        heart.classList.add('fa-heart');
        likes.appendChild(heart);
        likesPrice.appendChild(likes);

        price.textContent = `${data.user.price}€ / jours`;
        likesPrice.appendChild(price);


        return (photographHeader);

    }

}