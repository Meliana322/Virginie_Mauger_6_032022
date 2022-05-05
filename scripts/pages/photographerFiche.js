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
        modalbg.style.display = "block";
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
          resultSortingMedia[i].video,
          resultSortingMedia[i].date
        );
      }

      // ajouter event listener de likes

      const container = document.querySelectorAll(".cardsButton");

      container.forEach((item) => item.addEventListener("click", AddLikes)); // container > sur chaque item > addEventListener > (click, fc > add)

      function AddLikes() {
        let nblikes = Number(this.querySelector(".cardsLikes").textContent);
        console.log("current : ", nblikes);
        nblikes++; // après incrémentation ? afficher le résultat après
        console.log("next : ", nblikes);
      }

      // ! Total des likes de chaque photographe
      const profilLikesHeart = document.querySelector("#profil-likes_heart");

      // J'additionne tous les likes de chaque médias pour obtenir le total
      const totalLikes = resultSortingMedia.reduce((total, media) => {
        return total + media.likes;
      }, 0);

      profilLikesHeart.textContent = totalLikes;
      // ! Trie des médias par popularité, titre ou dats
      document
        .querySelector("#filters-select")
        .addEventListener("change", function (e) {
          if (e.target.value === "popularite") {
            resultSortingMedia.sort(function (a, b) {
              // tri par popularité
              if (a.likes > b.likes) {
                return -1;
              } else {
                return 1;
              }
            });
          }
          if (e.target.value === "titre") {
            resultSortingMedia.sort(function (a, b) {
              //tri par titre
              if (a.title > b.title) {
                return 1;
              } else {
                return -1;
              }
            });
          }
          if (e.target.value === "date") {
            resultSortingMedia.sort(function (a, b) {
              // tri par date
              if (a.date > b.date) {
                return 1;
              } else {
                return -1;
              }
            });
          }
          // Parcours du tableau des médias
          document.querySelector(".wrapper").innerHTML = "";
          for (let i = 0; i < resultSortingMedia.length; i++) {
            displayMedia(
              resultSortingMedia[i].title,
              resultSortingMedia[i].likes,
              resultSortingMedia[i].image,
              resultSortingMedia[i].video
            );
          }
        });
    });
};
getPhotographInfo();

// ! Section gallery
const galleryDOM = document.querySelector(".wrapper");
function displayMedia(titre, likes, image, video) {
  // const galleryDOM = document.querySelector(".wrapper");

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
      </div>`;
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
  </div>`;
  }
}

// ! Ligthbox
// const imageDom = galleryDOM.children;
// galleryDOM.forEach((imageDom) => {
//   imageDom.addEventListener("click", () => {
//     Ligthbox.show();
//   });
// });

// class Ligthbox {
//   constructor(listElement) {
//     this.currentElement = null;
//     this.listElement = listElement;
//   }
//   show(element) {
//     this.currentElement = element;
//   }
//   next() {}
//   previous() {}
//   manageEvent() {}
// }

// ! Section profil-likes-price

function displayPrice(price) {
  const galleryDOM = document.querySelector(".profil-likes-price");
  galleryDOM.innerHTML =
    galleryDOM.innerHTML +
    `<article class="profil-like-photograph">
      <div class="profil-likes">
        <span id="profil-likes_heart"></span>
         <i class="fas fa-heart iconeLike"></i>
      </div>
      <div class="profil-price">
        <span id="profil-price-day">${price}€ / jour</span>
      </div>
    </article>`;
}
