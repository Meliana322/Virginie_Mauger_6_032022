// ! Section profil-likes-price

export function displayPrice(price) {
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
