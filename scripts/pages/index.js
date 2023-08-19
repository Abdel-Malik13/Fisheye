import { getPhotographers } from "../dataServices/photographerDataService.js";
import { PhotographerFactory } from "../factories/photographerFactory.js";

function displayPhotographers(photographers) {
    const photographersSection = document.querySelector(".photographer-section");

    photographers.forEach((photographer) => {
        const photographerModel = PhotographerFactory.getUserCardDOM(photographer);
        photographersSection.appendChild(photographerModel);
    });
}


async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayPhotographers(photographers);
}

init();