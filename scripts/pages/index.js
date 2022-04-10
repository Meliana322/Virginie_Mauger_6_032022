import { photographerFactory } from "../factories/photographer.js";

async function getPhotographers() {
  // Informations photographes récupérées dans le json
  const data = await fetch("./data/photographers.json"); //await attend que la promesse est été résolue
  const result = await data.json(); // .json: transforme les données JSON en objets
  // console.log(result);

  return {
    photographers: result.photographers,
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers(); //await renvoi données JSON
  //console.log(photographers);
  displayData(photographers);
}

init();
