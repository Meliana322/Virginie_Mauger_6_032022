// !Code JavaScript lié à la page photographer.html
// const sectionPhotographHeader = document.getElementById("photographHeader");
// Création des éléments du DOM avec classes, id, attributs
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

// Transformation et Récupération des données JSON en objet
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
      // code qui affiche les infos du photographe
      displayPhotographer(
        myPhotographer.name,
        myPhotographer.portrait,
        myPhotographer.city,
        myPhotographer.country,
        myPhotographer.tagline
      );

      // !donnnes des media
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
          resultSortingMedia[i].image
        );
      }
      for (let i = 0; i < resultSortingMedia.length; i++) {
        displayPrice(resultSortingMedia[i].price);
      }
    });
};
getPhotographInfo();

// !Section gallery

function displayMedia(titre, likes, image) {
  const galleryDOM = document.querySelector(".gallery");
  galleryDOM.innerHTML =
    galleryDOM.innerHTML +
    `<article class=galleryCards>
      <a href="#" class="linkLightbox">
        <img class="linkLightboxImage" src="assets/${photographerId}/${image}"/>
      </a>
      <div class="galleryDescription">
        <h2 class="cardsTitle">${titre}</h2>
        <button class="cardsButton">
          <span class="cardsLikes">${likes}</span>
          <i class="fas fa-heart icone-like"></i>
        </button>
    </article>`;
}
// !Section profil-likes-price

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
