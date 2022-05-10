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

  static add() {
    return 2;
  }

  inc() {
    this.likes += 1;
    this.span.textContent = this.likes;
  }
  display() {
    const galleryDOM = document.querySelector(".wrapper");
    const div = document.createElement("div");
    div.classList.add("gallery");

    if (this.image !== undefined) {
      // Si image existe affiche là
      // galleryDOM.innerHTML =
      //   galleryDOM.innerHTML +
      //   `<div class="gallery">
      //   <div class="image">
      //       <a href="#lightbox" class="link-media" aria-label="open lightbox view">
      //           <img src="assets/${this.photographerId}/${this.image}" alt="">
      //       </a>
      //       <div class="galleryDescription">
      //       <h2 class="cardsTitle">${this.title}</h2>
      //       <button class="cardsButton">
      //           <span class="cardsLikes">${this.likes}</span>
      //           <i class="far fa-heart heart icone-like"></i>
      //       </button>
      //     </div>
      //   </div>`;

      div.innerHTML = ` <div class="image">
      <a href="#lightbox" class="link-media" aria-label="open lightbox view">
          <img src="assets/${this.photographerId}/${this.image}" alt="">
      </a>
      <div class="galleryDescription">
      <h2 class="cardsTitle">${this.title}</h2>
      <button class="cardsButton">
          <span class="cardsLikes">${this.likes}</span>
          <i class="far fa-heart heart icone-like"></i>
      </button>
    </div>`;
      galleryDOM.appendChild(div);

      const btn = div.querySelector(".cardsButton");
      this.span = div.querySelector(".cardsLikes");
      // console.log(btn);
      // this.btn = document.createElement("button");
      btn.addEventListener("click", this.inc);
    } else {
      //   galleryDOM.innerHTML = // Sinon affiche la video
      //      galleryDOM.innerHTML+
      //     `<div class="gallery">
      //   <div class="image">
      //     <a href="#lightbox" class="link-media" aria-label="open lightbox view">
      //       <video controls width="">
      //        <source src="assets/${this.photographerId}/${this.video}"
      //     type="video/mp4">
      //       </video>
      //     </a>
      //   <div class="galleryDescription">
      //     <h2 class="cardsTitle">${this.title}</h2>
      //     <button class="cardsButton">
      //       <span class="cardsLikes">${this.likes}</span>
      //       <i class="far fa-heart heart icone-like"></i>
      //     </button>
      //   </div>
      // </div>`;
    }
  }
}
