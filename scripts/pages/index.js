function displayPhotographers(photographers) {
    const photographersSection = document.querySelector(".photographer-section");

    photographers.forEach((photographer) => {
        const photographerModel = PhotographerFactory.getUserCardDOM(photographer);
        // const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(photographerModel);
    });
};


async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayPhotographers(photographers);
};

init();