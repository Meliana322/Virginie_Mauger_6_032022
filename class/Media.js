export class Media {
  constructor(titre, likes, image, video, date, photographerId) {
    this.title = titre;
    this.likes = likes;
    this.image = image;
    this.video = video;
    this.date = date;
    this.photographerId = photographerId;
    this.inc = this.inc.bind(this);
  }

  inc() {
    const heart = document.querySelector(".icone-like");

    if (heart.classList.contains("active")) {
      heart.classList.remove("active");
      this.likes--;
      this.span.textContent = this.likes;
    } else {
      heart.classList.add("active");
      this.likes++;
      this.span.textContent = this.likes;
    }
  }
  display() {
    const galleryDOM = document.querySelector(".wrapper");
    const div = document.createElement("div");
    div.classList.add("gallery");

    if (this.image !== undefined) {
      // Si image existe affiche là

      div.innerHTML = ` 
      <div class="image">
        <a href="#lightbox" class="link-media" aria-label="open lightbox view">
            <img src="assets/${this.photographerId}/${this.image}" alt="">
        </a>
        <div class="galleryDescription">
          <h2 class="cardsTitle">${this.title}</h2>
          <button class="cardsButton">
              <span class="cardsLikes">${this.likes}</span>
              <i class="far fa-heart heart icone-like"></i>
          </button>
        </div>
      </div>`;
      galleryDOM.appendChild(div);

      const btn = div.querySelector(".cardsButton");
      this.span = div.querySelector(".cardsLikes");
      this.heart = div.querySelector(".icone-like");
      btn.addEventListener("click", this.inc);
    } else {
      div.innerHTML = ` 
      <div class="image">
        
        <a href="#lightbox" class="link-media" aria-label="open lightbox view">
          <video controls width="">
          <source src="assets/${this.photographerId}/${this.video}"
          </video>
        </a>
        <div class="galleryDescription">
          <h2 class="cardsTitle">${this.title}</h2>
          <button class="cardsButton">
              <span class="cardsLikes">${this.likes}</span>
              <i class="far fa-heart heart icone-like"></i>
          </button>
        </div>
      </div>`;
      galleryDOM.appendChild(div);

      // const btn = div.querySelector(".cardsButton");
      this.span = div.querySelector(".cardsLikes");
      this.heart = div.querySelector(".icone-like");
      this.heart.addEventListener("click", this.inc);
    }
  }
}
