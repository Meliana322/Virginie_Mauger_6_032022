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

const photographerId = Number(searchParams.get("id")); // Recupère via la barre d'adresse l'id du photographe en nombre et non en string
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
        console.log(resultSortingMedia[i].title);
        displayMedia(resultSortingMedia[i].title, resultSortingMedia[i].likes);
      }
      // console.log(resultSortingMedia);
    });
};
getPhotographInfo();

// !Section gallery

function displayMedia(titre, likes) {
  const galleryDOM = document.querySelector(".gallery");
  galleryDOM.innerHTML =
    galleryDOM.innerHTML +
    `<div class="cardImage">
      <a class="lienImageGallery src="assets" href= "#">
        <img class=imageGallerie alt="#">
      </a>
      <h1 class="titleImage">${titre}</h1>
      <span class="likesImage">${likes}</span>
      <i class=fas fa-heart iconeLike></i>
    </div>`;
}

// displayMedia("Cheval", 334);
// displayMedia("Cheval22", 442);

// const tableau = [17,39,75]
// tableau[1]

// const objet = {
//   name: "daily",
//   firstName: "pierre"
// }

// objet.name
