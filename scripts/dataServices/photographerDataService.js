import { MediaFactory } from "../factories/mediaFactory.js";

export async function getPhotographers() {

    return await fetch("./data/photographers.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return data.photographers;
        })

}

export async function getPhotographerById(id) {

    return fetch("./data/photographers.json")
    .then(function(response) {
        return response.json();
    })
    .then(async function(data) {

        const photosOfPhotographer = [];
        const photographerData = {};

        for (let index = 0; index < data.photographers.length; index++) {
            const photographers = data.photographers[index];
            
            if (photographers.id == id) {
                photographerData.user = photographers;
            }
        }

        for (let index = 0; index < data.media.length; index++) {
            const photographerMedia = data.media[index];

            if (photographerMedia.photographerId == id) {
                photosOfPhotographer.push(photographerMedia);
            }
        }

        photographerData.medias = photosOfPhotographer;
        return photographerData;
    })
}

export async function getPhotosOfPhotographer(idPhotographer) {
    return await fetch("./data/photographers.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            for (let index = 0; index < data.media.length; index++) {
                const media = data.media[index];

                if (media.photographerId === idPhotographer) {
                    
                    if (media.image) {
                        MediaFactory.getUserPictures(media);
                    } else if (media.video) {
                        MediaFactory.displayUserVideo(media);
                    } else {
                        throw "Unknow media";
                    }
                }
            }
        })
}