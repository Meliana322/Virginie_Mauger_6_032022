// !Code JavaScript lié à la page photographer.html
const sectionPhotographHeader = document.getElementById("photographHeader");
const photographDiv = document.getElementById("photographDiv");

const myPhotographer = {
  name: "Tracy Galindo",
  id: 82,
  city: "Montreal",
  country: "Canada",
  tagline: "Voir le beau dans le quotidien",
  price: 500,
  portrait: "TracyGalindo.jpg",
};
// Création des éléments du DOM avec classes, id, attributs

let article = document.createElement("article");
sectionPhotographHeader.appendChild(article);
article.classList.add("photographProfil");

let h1 = document.createElement("h1");
article.appendChild(h1);
h1.innerHTML = myPhotographer.name;
h1.classList.add("photographName");

let span = document.createElement("span");
article.appendChild(span);
span.innerHTML = myPhotographer.city + ", " + myPhotographer.country;
span.classList.add("photographLocation");

let p = document.createElement("p");
article.appendChild(p);
p.innerHTML = myPhotographer.tagline;
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
img.setAttribute("src", "assets/Mimi/Portrait_Nora.jpg");
img.setAttribute("alt", "#");
