// function photographerFactory(data) {
//   const { name, portrait, city, country, tagline, price } = data;

//   const picture = `assets/photographers/${portrait}`;

//   function getUserCardDOM() {
//     const article = document.createElement("article");
//     const img = document.createElement("img");
//     img.setAttribute("src", picture);
//     const h2 = document.createElement("h2");
//     h2.textContent = name;
//     article.appendChild(img);
//     article.appendChild(h2);
//     return article;
//   }
//   return { name, picture, getUserCardDOM };
// }

export function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const divPresentation = document.createElement("a"); // Création élément parent img/h2
    const divDescription = document.createElement("div"); // Création élément parent city + country + tag + price
    divPresentation.setAttribute("href", "#");

    // Presentation
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;

    // Description
    const p1 = document.createElement("p");
    p1.textContent = city + ", " + country;
    p1.setAttribute("class", "location"); // Attribution de classe
    const p2 = document.createElement("p");
    p2.textContent = tagline;
    p2.setAttribute("class", "tag"); // Attribution de classe
    const p3 = document.createElement("p");
    p3.textContent = price + " €/jour";
    p3.setAttribute("class", "price"); // Attribution de classe
    article.appendChild(divPresentation);
    divPresentation.appendChild(img);
    divPresentation.appendChild(h2);
    article.appendChild(divDescription);
    divDescription.appendChild(p1);
    divDescription.appendChild(p2);
    divDescription.appendChild(p3);
    divPresentation.setAttribute("class", "presentation"); // Attribution de classe
    divDescription.setAttribute("class", "description"); // Attribution de classe

    return article;
  }
  return { name, picture, city, getUserCardDOM };
}
