import { displayPhotographer } from "../utils/displayPhotographer.js";
import { Lightbox } from "../class/Lightbox.js";
import { launchModal, closeModal } from "../utils/contactForm.js";
import { mediaFactory } from "../factories/mediaFactory.js";
import { displayPrice } from "../utils/displayPrice.js";

// !Transformation et Récupération des données JSON en objet
const url = new URL(window.location);
const searchParams = new URLSearchParams(url.search);
// Recupère via la barre d'adresse l'id du photographe en nombre et non en string
const photographerId = Number(searchParams.get("id"));
const getPhotographInfo = () => {
  fetch("data/photographers.json")
    .then((res) => res.json())
    .then((json) => {
      // Récupere les infos des photographes (TOUS)
      const myPhotographer = json.photographers.find(function (photographer) {
        return photographer.id === photographerId;
      });

      displayPrice(myPhotographer.price);

      // Code qui affiche les infos du photographe
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
      const modalBtn = document.querySelectorAll(".contactButton");

      // Open MODAL
      modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

      // Close MODAL
      const closeBtn = document.querySelector("#form__close");
      closeBtn.addEventListener("click", closeModal);

      // Ciblage des éléments du formulaire
      const formData = document.querySelectorAll(".formData");
      const firstName = document.getElementById("first");
      const lastName = document.getElementById("last");
      const eMail = document.getElementById("email");

      // Vérification des données formulaires
      document
        .getElementById("formulaire")
        .addEventListener("submit", function (e) {
          e.preventDefault();
          let error = "";

          // Prénom
          if (firstName.value.length < 2) {
            error = "Veuillez entrer 2 caractères ou plus pour ce champ";
            formData[0].setAttribute("data-error", error);
            // si data-error = true affiche le msg d'erreur
            formData[0].setAttribute("data-error-visible", true);
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
            !eMail.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,64})+$/)
          ) {
            error = "Merci de saisir une adresse mail valide";
            formData[2].setAttribute("data-error", error);
            formData[2].setAttribute("data-error-visible", true);
          } else {
            formData[2].setAttribute("data-error-visible", false);
          }

          // Disparition du formulaire, affichage de la modale d'envoi de formulaire
          if (error === "") {
            // modalbg.style.display = "none";
            console.log("Prénom :" + firstName.value);
            console.log("Nom :" + lastName.value);
            console.log("Email :" + eMail.value);
            console.log("Message :" + document.querySelector("#message").value);
            closeModal();
          }
        });

      // !donnnées des médias
      //Tableau de tous les médias
      const mediaPhotographer = json.media;

      // Tableau des médias trié
      let resultSortingMedia = [];
      // Tant que "i" est inférieur à la taille du tableau
      for (let i = 0; i < mediaPhotographer.length; i++) {
        // Si l'id de la barre d'adresse est identique à l'id du propriétaire du media
        if (photographerId === mediaPhotographer[i].photographerId) {
          // alors ajoute le media dans le tableau resultSortingMedia
          resultSortingMedia.push(mediaPhotographer[i]);
        }
      }
      for (let i = 0; i < resultSortingMedia.length; i++) {
        let newMedia = mediaFactory(
          resultSortingMedia[i],
          resultSortingMedia,
          photographerId
        );

        newMedia.display();
        resultSortingMedia[i] = newMedia;
      }

      Lightbox.init();

      // !Trie des médias par popularité, titre ou dates
      // Flèche du Tri
      const filtreArrow = document.querySelector(".filter-container");
      function Arrow() {
        if (filtreArrow.classList.contains("on")) {
          filtreArrow.classList.remove("on");
        } else {
          filtreArrow.classList.add("on");
        }
      }
      filtreArrow.addEventListener("click", Arrow);

      document
        .querySelector("#filters-select")
        // Evénement "change" pour cibler un changement de valeur réalisé par l'utilisateur
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
