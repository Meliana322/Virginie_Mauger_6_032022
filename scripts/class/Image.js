export class Image {
  constructor(titre, likes, image, video, date, photographerId, array) {
    this.title = titre;
    this.likes = likes;
    this.image = image;
    // this.video = video;
    this.date = date;
    this.photographerId = photographerId;
    this.array = array;
    this.inc = this.inc.bind(this);
    this.reduce();
  }

  reduce() {
    const profilLikesHeart = document.querySelector("#profil-likes_heart");

    // J'additionne tous les likes de chaque médias pour obtenir le total
    let totalLikes = this.array.reduce((total, media) => {
      return total + media.likes;
    }, 0);

    profilLikesHeart.textContent = totalLikes;
    return totalLikes;
  }

  inc() {
    // const heart = document.querySelector(".icone-like");
    const profilLikesHeart = document.querySelector("#profil-likes_heart");
    let totalLikes = this.reduce();

    if (this.heart.classList.contains("active")) {
      this.heart.classList.remove("active");
      this.likes--;
      totalLikes--;
      this.span.textContent = this.likes;
      this.heart.style.fontWeight = "100";
    } else {
      this.heart.classList.add("active");
      this.likes++;
      totalLikes++;
      this.span.textContent = this.likes;
      this.heart.style.fontWeight = "900";
    }
    profilLikesHeart.textContent = totalLikes;
  }
  display() {
    const galleryDOM = document.querySelector(".wrapper");
    const div = document.createElement("div");
    div.classList.add("gallery");

    // Si image existe affiche là
    div.innerHTML = ` 
        <article class="image" aria-label="image">
          <a href="#lightbox" class="link-media" aria-label="open lightbox view">
              <img src="assets/${this.photographerId}/${this.image}" alt="${this.title}" aria-label="${this.title}">
          </a>
          <div class="galleryDescription">
            <h2 class="cardsTitle">${this.title}</h2>
            <button class="cardsButton" aria-label="liker photo">
                <span class="cardsLikes">${this.likes}</span>
                <i class="far fa-heart heart icone-like"></i>
            </button>
          </div>
        </article>`;
    galleryDOM.appendChild(div);
    const btn = div.querySelector(".cardsButton");
    this.span = div.querySelector(".cardsLikes");
    this.heart = div.querySelector(".icone-like");
    btn.addEventListener("click", this.inc);
  }
}
