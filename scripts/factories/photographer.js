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

function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const divPresentation = document.createElement("div"); // Création élément parent img/h2
    const divDescription = document.createElement("div"); // Création élément parent city + country + tag + price
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
    p3.textContent = price + " €/mois";
    p3.setAttribute("class", "price"); // Attribution de classe
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(p1);
    article.appendChild(p2);
    article.appendChild(p3);
    return article;
  }
  return { name, picture, city, getUserCardDOM };
}
