//Mettre le code JavaScript lié à la page photographer.html
// const url = (new URL(document.location)).searchParams.get("id");
// console.log(parseInt(url));


async function getPhotographers() {

    return await fetch("../../Fisheye/data/photographers.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return data.photographers;
        })

}

async function getPhotographerById(id) {

    return fetch("../../Fisheye/data/photographers.json")
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

async function getPhotosOfPhotographer(idPhotographer) {
    console.log("get photos");
    return await fetch("../../Fisheye/data/photographers.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            for (let index = 0; index < data.media.length; index++) {
                const media = data.media[index];

                // console.log(media);
                
                if (media.photographerId === idPhotographer) {
                    
                    // console.log(media);
                    if (media.image) {
                        MediaFactory.getUserPictures(media);
                        // console.log(`media.image ${media.image}`);
                    } else if (media.video) {
                        MediaFactory.displayUserVideo(media);
                        // console.log(`media.video ${media.video}`);
                    } else {
                        throw "Unknow media";
                    }

                    // mediaFactory(media, media).getUserPictures(media);
                }
            }
        })
}



// getPhotographer(parseInt(url))

// getPhotographerByWithSort()

// getPhotosOfPhotographer(82)