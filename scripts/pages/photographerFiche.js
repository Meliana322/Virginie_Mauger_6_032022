// import { launchModal } from "../utils/contactForm.js";
// import { closeModal } from "../utils/contactForm.js";
// const modalBg = document.querySelector("#formulaire");
// const closeBtn = document.querySelector(".close-contact");

// !Création des éléments du DOM avec classes, id, attributs
function displayPhotographer(name, portrait, city, country, tagline) {
  const sectionPhotographHeader = document.getElementById("photographHeader");
  sectionPhotographHeader.innerHTML =
    sectionPhotographHeader.innerHTML +
    `<article class="photographProfil">
      <h1 class="photographName">${name}</h1>
      <span class="photographLocation">${city}, ${country}</span>
      <p class="photographTagline">${tagline}</p>
    </article>
    <div class="divContactButton">
        <button class="contactButton">Contactez-moi</button>
    </div>
    <figure id="photographPortrait" class="photographPortrait">
      <img class="photographPhotoProfil" src="assets/photographers/${portrait}"></img>
    </figure>`;
}

// !Transformation et Récupération des données JSON en objet
const url = new URL(window.location);
const searchParams = new URLSearchParams(url.search);
const photographerId = Number(searchParams.get("id")); // Recupère via la barre d'adresse l'id du photographe en nombre et non en string
const getPhotographInfo = () => {
  fetch("data/photographers.json")
    .then((res) => res.json())
    .then((json) => {
      // je récupere les infos des photographes (TOUS)
      const myPhotographer = json.photographers.find(function (photographer) {
        return photographer.id === photographerId;
      });

      displayPrice(myPhotographer.price);

      // code qui affiche les infos du photographe
      displayPhotographer(
        myPhotographer.name,
        myPhotographer.portrait,
        myPhotographer.city,
        myPhotographer.country,
        myPhotographer.tagline
      );
      // Ouverture formulaire de contact lors du clic

      const modalbg = document.querySelector("#formulaire");
      const modalBtn = document.querySelectorAll(".contactButton");

      // launch modal event
      modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

      // launch modal form
      function launchModal() {
        modalbg.style.display = "flex";
      }

      // CLOSE MODAL

      function closeModal() {
        modalbg.style.display = "none";
      }

      const closeBtn = document.querySelector("img.close-contact");

      closeBtn.addEventListener("click", closeModal);

      // !donnnées des médias
      //Tableau de tous les médias
      const mediaPhotographer = json.media;

      // Tableau des médias trié
      let resultSortingMedia = [];
      // Tant que "i" est inférieur à la taille du tableau
      for (let i = 0; i < mediaPhotographer.length; i++) {
        // Si l'id de la barre d'adresse est identique a l'id du proprio du media
        if (photographerId === mediaPhotographer[i].photographerId) {
          // alors J'ajoute le media dans le tableau resultSortingMedia
          resultSortingMedia.push(mediaPhotographer[i]);
        }
      }
      for (let i = 0; i < resultSortingMedia.length; i++) {
        displayMedia(
          resultSortingMedia[i].title,
          resultSortingMedia[i].likes,
          resultSortingMedia[i].image,
          resultSortingMedia[i].video
        );
      }
    });
};

getPhotographInfo();

// ! Section gallery

function displayMedia(titre, likes, image, video) {
  const galleryDOM = document.querySelector(".wrapper");

  if (image !== undefined) {
    // Si image existe affiche là
    galleryDOM.innerHTML =
      galleryDOM.innerHTML +
      `<div class="gallery">
      <div class="image">
        <span>
          <img src="assets/${photographerId}/${image}" alt="">
        </span>
      <div class="galleryDescription">
        <h2 class="cardsTitle">${titre}</h2>
        <button class="cardsButton">
          <span class="cardsLikes">${likes}</span>
          <i class="fas fa-heart icone-like"></i>
        </button>
      </div>
    </div>
  <div class="preview-box">
    <div class="image-box">
      <p class="current-img"></p>
      <div class="slide prev"><i class="fas fa-angle-left"></i>
      </div>
      <p class="total-img"></p>
      <div class="slide next"><i class="fas fa-angle-right"></i>
      </div>
      <img class="lightbox-img" src="" alt="">
    </div>
    <div class="details">
      <h2 class="lightbox-title-image">sssss</h2>
      <span class="icon fas fa-times"></span>
    </div>
  </div>
  <div class="shadow"></div>`;
  } else {
    galleryDOM.innerHTML = // Sinon affiche la video
      galleryDOM.innerHTML +
      `<div class="gallery">
    <div class="image">
      <span>
        <video controls width="">
         <source src="assets/${photographerId}/${video}"
      type="video/mp4">
        </video>
      </span>
    <div class="galleryDescription">
      <h2 class="cardsTitle">${titre}</h2>
      <button class="cardsButton">
        <span class="cardsLikes">${likes}</span>
        <i class="fas fa-heart icone-like"></i>
      </button>
    </div>
  </div>
<div class="preview-box">
  <div class="image-box">
    <p class="current-img"></p>
    <div class="slide prev"><i class="fas fa-angle-left"></i>
    </div>
    <p class="total-img"></p>
    <div class="slide next"><i class="fas fa-angle-right"></i>
    </div>
    <img class="lightbox-img" src="" alt="">
  </div>
  <div class="details">
    <h2 class="lightbox-title-image">sssss</h2>
    <span class="icon fas fa-times"></span>
  </div>
</div>
<div class="shadow"></div>`;
  }
}
displayMedia();
// ! Section profil-likes-price

function displayPrice(price) {
  const galleryDOM = document.querySelector(".profil-likes-price");
  galleryDOM.innerHTML =
    galleryDOM.innerHTML +
    `<article class="profil-like-photograph">
      <div class="profil-likes">
        <span id="profil-likes_heart">297 081</span>
         <i class="fas fa-heart iconeLike"></i>
      </div>
      <div class="profil-price">
        <span id="profil-price-day">${price}€ / jour</span>
      </div>
    </article>`;
}
displayPrice();
