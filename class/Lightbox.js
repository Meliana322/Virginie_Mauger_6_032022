import {
  enableBodyScroll,
  disableBodyScroll,
} from "../../scripts/body-scroll-locks.js";
/**
 * @property {HTMLElement} element
 * @property {string[]} imagesChemin des images de la lightbox
 * @property {string} url image actuellement affichée
 */

export class Lightbox {
  static init() {
    const links = Array.from(
      document.querySelectorAll('img[src$=".jpg"], video source[src$=".mp4"]')
    );
    const galleryLightbox = links.map((link) => link.getAttribute("src"));
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        new Lightbox(e.currentTarget.getAttribute("src"), galleryLightbox);
      });
    });
  }
  /**
   *
   * @param {string} url URL de l'image
   * @param {string[]} images Chemin des images de la lightbox
   */
  constructor(url, images, video, titre) {
    this.element = this.buildDOM(url);
    this.images = images;
    console.log(this.images);
    this.loadImage(url);
    this.video = video;
    this.title = titre;
    this.loadTitle(url);

    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);

    disableBodyScroll(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  // /**
  //  * @param {string} url URL de l'image
  //  */
  loadImage(url) {
    this.url = null;
    const image = document.createElement("img");
    const video = document.createElement("video");
    const container = this.element.querySelector(".lightbox__container");
    const loader = document.createElement("div");
    loader.classList.add("lightbox__loader");
    container.innerHTML = "";
    container.appendChild(loader);
    container.removeChild(loader);

    video.setAttribute("controls", "");
    image.classList.add("cardsImage");
    video.classList.add("video");
    this.url = url;
    let extensionsMedias = [];
    for (let i = 0; i < this.images.length; i++) {
      extensionsMedias[i] = this.images[i].split(".").pop();
      if (this.url.split(".").pop() === "jpg") {
        container.appendChild(image);
        image.src = url;
      }
      if (this.url.split(".").pop() === "mp4") {
        container.appendChild(video);
        video.src = url;
      }
    }
  }
  loadTitle() {
    this.url = null;
    const container = this.element.querySelector(".lightbox__container");
    console.log(container);
    const title = document.createElement("h2");
    title.classList.add("cardsTitle");

    container.appendChild(title);
  }

  /**
   * @param {KeyboardEvent} fermeture au clavier
   */
  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    }
  }

  /**
   * Ferme la Lightbox
   * @param {MouseEvent/KeyboardEvent} e
   */
  close(e) {
    e.preventDefault();
    this.element.classList.add("fadeOut");
    enableBodyScroll(this.element);
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }
  /**
   * @param {MouseEvent/KeyboardEvent} e
   */
  next(e) {
    e.preventDefault();
    let i = this.images.findIndex((image) => image === this.url);
    if (i === this.images.length - 1) {
      i = -1;
    }
    this.loadImage(this.images[i + 1]);
  }

  /**
   * @param {MouseEvent/KeyboardEvent} e
   */
  prev(e) {
    e.preventDefault();
    let i = this.images.findIndex((image) => image === this.url);
    if (i === 0) {
      i = this.images.length;
    }
    this.loadImage(this.images[i - 1]);
  }

  /**
   * @param {string} url URL de l'image
   * @return {HTMLElement}
   */
  buildDOM(url) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `<button class="lightbox__close">Fermer</button>
    <button class="lightbox__next">Suivant</button>
    <button class="lightbox__prev">Précédent</button>
    <div class="lightbox__container">
    </div>`;
    dom
      .querySelector(".lightbox__close")
      .addEventListener("click", this.close.bind(this));
    dom
      .querySelector(".lightbox__next")
      .addEventListener("click", this.next.bind(this));
    dom
      .querySelector(".lightbox__prev")
      .addEventListener("click", this.prev.bind(this));
    return dom;
  }
}
