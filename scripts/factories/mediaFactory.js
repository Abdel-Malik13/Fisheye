class MediaFactory {

    static displayUserPicture(photo) {
        const picturesPhotographer = document.querySelector('.pictures-photographer');
        const picturePhotographer = document.createElement('article');
        const picture = document.createElement('div');
        const linkPicture = document.createElement('a');
        const pictureImg = document.createElement('img');
        const pictureInformations = document.createElement('div');
        const pictureTitle = document.createElement('h2');
        const btnLike = document.createElement('span');
        const allLikesUser = document.querySelector('.likes');
        const likesHeart = document.createElement('i');
        const iconHeart = document.createElement('i');
        const lightboxTitle = document.querySelector('.lightbox-title');


        picturePhotographer.classList.add('picture-photographer');
        picturesPhotographer.appendChild(picturePhotographer);

        linkPicture.classList.add('link-picture');
        linkPicture.setAttribute('href', '#');
        linkPicture.setAttribute('tabindex', '4');
        picturePhotographer.appendChild(linkPicture);

        picture.classList.add('picture');
        linkPicture.appendChild(picture);

        pictureImg.setAttribute('src', `../../Fisheye/assets/images/${photo.image}`);
        pictureImg.setAttribute('alt', photo.title);
        picture.appendChild(pictureImg);

        pictureInformations.classList.add('picture-informations');
        picturePhotographer.appendChild(pictureInformations);

        pictureTitle.classList.add('picture-title');
        pictureTitle.textContent = `${photo.title}`;
        pictureInformations.appendChild(pictureTitle);

        btnLike.classList.add('btn-like');
        btnLike.setAttribute('data-id', photo.id);
        btnLike.setAttribute('tabindex', '4');
        btnLike.textContent = localStorage.getItem(`id-${photo.id}`) ? localStorage.getItem(`id-${photo.id}`):`${photo.likes}`;
        btnLike.addEventListener('click', function() {
            let liked = localStorage.getItem(`id-${this.dataset.id}-liked`) == null ? false:localStorage.getItem(`id-${this.dataset.id}-liked`);

            if (liked === "true") {
                console.log("Tu as déjà liké cette photo");
                this.textContent--;
                allLikesUser.textContent--;
                this.appendChild(iconHeart);
                localStorage.setItem(`id-${this.dataset.id}`, this.textContent);
                localStorage.setItem(`id-${this.dataset.id}-liked`, false);
            } else {
                this.textContent++;
                allLikesUser.textContent++;
                this.appendChild(iconHeart);
                localStorage.setItem(`id-${this.dataset.id}`, this.textContent);
                localStorage.setItem(`id-${this.dataset.id}-liked`, true);
            }
            
        });

        btnLike.addEventListener('keydown', function(e) {
            let liked = localStorage.getItem(`id-${this.dataset.id}-liked`) == null ? false:localStorage.getItem(`id-${this.dataset.id}-liked`);

            if (e.keyCode === 13) {
                console.log('liked');
                if (liked === "true") {
                    console.log("Tu as déjà liké cette photo");
                    this.textContent--;
                    allLikesUser.textContent--;
                    this.appendChild(iconHeart);
                    localStorage.setItem(`id-${this.dataset.id}`, this.textContent);
                    localStorage.setItem(`id-${this.dataset.id}-liked`, false);
                } else {
                    this.textContent++;
                    allLikesUser.textContent++;
                    this.appendChild(iconHeart);
                    localStorage.setItem(`id-${this.dataset.id}`, this.textContent);
                    localStorage.setItem(`id-${this.dataset.id}-liked`, true);
                }
            }
            
        });

        iconHeart.classList.add('fa-solid');
        iconHeart.classList.add('fa-heart');

        likesHeart.classList.add('fa-solid');
        likesHeart.classList.add('fa-heart');
        btnLike.appendChild(likesHeart);
        pictureInformations.appendChild(btnLike);


        // console.log(photo.title);
        // lightboxTitle.textContent = photo.title;

        return (picturePhotographer);

    }

    static displayUserMedias(medias) {
        for (let index = 0; index < medias.length; index++) {
            const element = medias[index];

            if (element.image) {
                MediaFactory.displayUserPicture(element);
            } else if (element.video) {
                MediaFactory.displayUserVideo(element);
            } else {
                throw "Unknow media";
            }

        }
    }

    static displayUserVideo(videos) {
        const picturesPhotographer = document.querySelector('.pictures-photographer');
        const videoPhotographer = document.createElement('article');
        const video = document.createElement('div');
        const linkVideo = document.createElement('a');
        const videoInformations = document.createElement('div');
        const videoTitle = document.createElement('h2');
        const videoLikes = document.createElement('span');
        const videoPlayer = document.createElement('video');
        const videoPlayerSource = document.createElement('source');
        const playerStart = document.createElement('i');
        const lightboxTitle = document.querySelector('.lightbox-title');


        videoPhotographer.classList.add('video-photographer');
        picturesPhotographer.appendChild(videoPhotographer);

        video.classList.add('video');
        videoPhotographer.appendChild(video);

        linkVideo.classList.add('link-picture');
        linkVideo.setAttribute('href', '#');
        linkVideo.setAttribute('tabindex', '4');
        video.appendChild(linkVideo);

        playerStart.classList.add('fa-solid');
        playerStart.classList.add('fa-play');

        playerStart.style.position = 'absolute';
        playerStart.style.zIndex = '9999';
        playerStart.style.left = '50%';
        playerStart.style.top = '50%';
        playerStart.style.color = '#901C1C';
        playerStart.style.fontSize = '6.6em';
        playerStart.style.transform = 'translate(-50%, -50%)';
        linkVideo.appendChild(playerStart);


        videoPlayer.setAttribute('src', `assets/images/${videos.video}`);
        videoPlayer.setAttribute('controlls', 'controlls');
        videoPlayer.setAttribute('width', '100%');
        videoPlayer.setAttribute('height', '100%');
        linkVideo.appendChild(videoPlayer);

        videoInformations.classList.add('video-informations');
        videoPhotographer.appendChild(videoInformations);

        videoTitle.classList.add('video-title');
        videoTitle.textContent = videos.title;
        videoInformations.appendChild(videoTitle);

        videoLikes.classList.add('btn-like');
        videoLikes.setAttribute('data-video-id', videos.id);
        videoLikes.setAttribute('tabindex', '4');
        videoLikes.textContent = localStorage.getItem(`id-video-${videos.id}`) ? localStorage.getItem(`id-video-${videos.id}`):`${videos.likes}`;
        videoLikes.addEventListener('click', function() {
            let liked = localStorage.getItem(`id-video-${this.dataset.videoId}-liked`) == null ? false:localStorage.getItem(`id-video-${this.dataset.videoId}-liked`);

            if (liked === "true") {
                this.textContent--;
                localStorage.setItem(`id-video-${this.dataset.videoId}`, this.textContent);
                localStorage.setItem(`id-video-${this.dataset.videoId}-liked`, false);
            } else {
                this.textContent++;
                localStorage.setItem(`id-video-${this.dataset.videoId}`, this.textContent);
                localStorage.setItem(`id-video-${this.dataset.videoId}-liked`, true);
            }
        })

        videoLikes.addEventListener('keydown', function(e) {
            let liked = localStorage.getItem(`id-video-${this.dataset.videoId}-liked`) == null ? false:localStorage.getItem(`id-video-${this.dataset.videoId}-liked`);

            if (e.keyCode === 13) {
                if (liked === "true") {
                    this.textContent--;
                    localStorage.setItem(`id-video-${this.dataset.videoId}`, this.textContent);
                    localStorage.setItem(`id-video-${this.dataset.videoId}-liked`, false);
                } else {
                    this.textContent++;
                    localStorage.setItem(`id-video-${this.dataset.videoId}`, this.textContent);
                    localStorage.setItem(`id-video-${this.dataset.videoId}-liked`, true);
                }
            }
        })

        
        videoInformations.appendChild(videoLikes);


        // console.log(picturesPhotographer);
        // console.log(videoPhotographer);
        // console.log(`videos ${videos}`);
    }

}