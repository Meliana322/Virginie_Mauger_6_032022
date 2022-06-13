export function displayPhotographer(name, portrait, city, country, tagline) {
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
