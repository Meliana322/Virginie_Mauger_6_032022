// !Code JavaScript lié à la page photographer.html
const sectionPhotographHeader = document.getElementById("photographHeader");

// Création des éléments du DOM avec classes, id, attributs

function displayPhotographer(name, portrait, city, country, tagLine) {
  let article = document.createElement("article");
  sectionPhotographHeader.appendChild(article);
  article.classList.add("photographProfil");

  let h1 = document.createElement("h1");
  article.appendChild(h1);
  h1.innerHTML = name;
  h1.classList.add("photographName");

  let span = document.createElement("span");
  article.appendChild(span);
  span.innerHTML = city + ", " + country;
  span.classList.add("photographLocation");

  let p = document.createElement("p");
  article.appendChild(p);
  p.innerHTML = tagLine;
  p.classList.add("photographTagline");

  let div = document.createElement("div");
  sectionPhotographHeader.appendChild(div);
  div.classList.add("divContactButton");

  let button = document.createElement("button");
  div.appendChild(button);
  button.classList.add("contactButton");
  button.innerHTML = "Contactez-moi";
  button.setAttribute("onclick", "displayModal()");

  let figure = document.createElement("figure");
  sectionPhotographHeader.appendChild(figure);
  figure.setAttribute("id", "photographPortrait");
  figure.classList.add("photographPortrait");

  let img = document.createElement("img");
  figure.appendChild(img);
  img.setAttribute("class", "photographPhotoProfil");
  img.setAttribute("src", `assets/photographers/${portrait}`);
  img.setAttribute("alt", "#");
}

// Transformation et Récupération des données JSON en objet
// console.log(window.location);
const url = new URL(window.location);
const searchParams = new URLSearchParams(url.search);

const photographerId = Number(searchParams.get("id")); // Recupère via la barre d'adresse l'id du photographe
// console.log(photographerId);
const getPhotographInfo = () => {
  fetch("data/photographers.json")
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.photographers);
      // console.log(json.media);
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
      // console.log(mediaPhotographer);

      // Tableau des médias trié
      let resultSortingMedia = [];
      // console.log(resultSortingMedia);

      // Tant que "i" est inférieur à la taille du tableau
      for (let i = 0; i < mediaPhotographer.length; i++) {
        if (
          // J'ajoute photographerId dans le tableau resultSortingMedia et si l'Id est égal à celui de mon photographe
          resultSortingMedia.push(
            mediaPhotographer[i].photographerId === photographerId
          )
        ) {
          console.log(resultSortingMedia);
        } else {
          console.log("error");
        }
      }
      console.log(resultSortingMedia);

      // !******************

      // affichage des medias
    });
};
getPhotographInfo();

// !Section lightbox

// const lightbox = document.querySelector(".lightbox");
// console.log(lightbox);

let divLightbox = document.createElement("div");
document.querySelector(".lightbox").appendChild(divLightbox);
divLightbox.classList.add("lightboxImg");

let lienLightbox = document.createElement("a");
document.querySelector(".lightboxImg").appendChild(lienLightbox);
lienLightbox.classList.add("lienLightbox");
lienLightbox.setAttribute("href", "#");

let imgLightbox = document.createElement("img");
document.querySelector(".lienLightbox").appendChild(imgLightbox);
imgLightbox.classList.add("imgLightbox");
imgLightbox.setAttribute("src", "#");

let lightboxDescription = document.createElement("div");
document.querySelector(".lightboxImg").appendChild(lightboxDescription);
lightboxDescription.classList.add("lightboxDescription");

let lightboxTitle = document.createElement("p");
document.querySelector(".lightboxDescription").appendChild(lightboxTitle);
lightboxTitle.classList.add("lightboxTitle");

let lightboxLikes = document.createElement("div");
document.querySelector(".lightboxDescription").appendChild(lightboxLikes);
lightboxLikes.classList.add("lightboxLikes");

let numberLikes = document.createElement("p");
document.querySelector(".lightboxLikes").appendChild(numberLikes);
numberLikes.classList.add("numberLikes");

let iconeLikes = document.createElement("i");
document.querySelector(".lightboxLikes").appendChild(iconeLikes);
iconeLikes.classList.add("iconeLikes");
