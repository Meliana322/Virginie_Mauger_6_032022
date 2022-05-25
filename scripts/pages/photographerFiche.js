// !Création des éléments du DOM avec classes, id, attributs
import { Media } from "../../class/Media.js";
import { Lightbox } from "../../class/Lightbox.js";
import { launchModal, closeModal } from "../utils/contactForm.js";

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
        <button title= "contactez-moi" class="contactButton">Contactez-moi</button>
    </div>
    <figure id="photographPortrait" class="photographPortrait">
      <img class="photographPhotoProfil" src="assets/photographers/${portrait}" alt="${name}"></img>
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

      // ! Section Formulaire de contact
      const nameForm = document.querySelector(".name-form");
      nameForm.innerHTML = myPhotographer.name;
      // Ouverture formulaire de contact lors du clic

      const modalbg = document.querySelector("#formulaire");
      const modalBtn = document.querySelectorAll(".contactButton");

      // launch modal event
      modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

      // CLOSE MODAL

      const closeBtn = document.querySelector("#form__close");

      closeBtn.addEventListener("click", closeModal);

      const formData = document.querySelectorAll(".formData");
      const firstName = document.getElementById("first");
      const lastName = document.getElementById("last");
      const eMail = document.getElementById("email");

      document
        .getElementById("formulaire")
        .addEventListener("submit", function (e) {
          e.preventDefault();
          let error = "";

          // Prénom
          if (firstName.value.length < 2) {
            error = "Veuillez entrer 2 caractères ou plus pour ce champ";
            formData[0].setAttribute("data-error", error);
            formData[0].setAttribute("data-error-visible", true); // si data-error = true affiche moi le msg
          } else {
            formData[0].setAttribute("data-error-visible", false);
          }

          // Nom
          if (lastName.value.length < 2) {
            error = "Veuillez entrer 2 caractères ou plus pour ce champ";
            formData[1].setAttribute("data-error", error);
            formData[1].setAttribute("data-error-visible", true);
          } else {
            formData[1].setAttribute("data-error-visible", false);
          }
          // Email
          if (
            !eMail.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,64})+$/)
          ) {
            error = "Merci de saisir une adresse mail valide";
            formData[2].setAttribute("data-error", error); // Autre manière de faire sans utiliser tableau mais utilisation des noeuds
            formData[2].setAttribute("data-error-visible", true);
          } else {
            formData[2].setAttribute("data-error-visible", false);
          }

          // Disparition du formulaire, affichage de la modale d'envoi de formulaire
          if (error === "") {
            modalbg.style.display = "none";
          }
        });

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
        const newMedia = new Media(
          resultSortingMedia[i].title,
          resultSortingMedia[i].likes,
          resultSortingMedia[i].image,
          resultSortingMedia[i].video,
          resultSortingMedia[i].date,
          photographerId,
          resultSortingMedia
        );

        newMedia.display();
        resultSortingMedia[i] = newMedia;
      }

      Lightbox.init();

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
          // Je trie puis je rappelle ma fonction pour un reset suite triage
          document.querySelector(".wrapper").innerHTML = "";
          for (let i = 0; i < resultSortingMedia.length; i++) {
            resultSortingMedia[i].display();
          }
          Lightbox.init();
        });
    });
};
getPhotographInfo();

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

document.addEventListener("keydown", (e) => {
  const submitBtn = document.querySelector(".contact_button");
  const closeBtn = document.querySelector("#form__close");
  if (e.key === "Tab") {
    if (document.activeElement === submitBtn) {
      e.preventDefault();
      closeBtn.focus();
    }
  }
});
