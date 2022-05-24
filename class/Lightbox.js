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
      document.querySelectorAll(
        'section.wrapper img[src$=".jpg"], section.wrapper video source[src$=".mp4"]'
      )
    );
    const linksTitles = Array.from(
      document.querySelectorAll(".galleryDescription h2")
    );
    let title = []; // Je récupère tous les titres dans un tableau
    for (let i = 0; i < linksTitles.length; i++) {
      title.push(linksTitles[i].textContent);
    }

    const galleryLightbox = links.map((link) => link.getAttribute("src"));

    const gallery = document.querySelectorAll(".gallery");
    gallery.forEach((link) => {
      const imagetest = link.querySelector("a");
      // console.log(imagetest);
      imagetest.addEventListener("click", (e) => {
        // console.log("e");
        e.preventDefault();
        const source = imagetest.querySelector("[src]").getAttribute("src");
        // console.log(source);
        const test = link.querySelector("h2").textContent;
        // console.log(test);

        new Lightbox(source, galleryLightbox, test, title);
      });
    });
  }

  /**
   *
   * @param {string} url URL de l'image
   * @param {string[]} images Chemin des images de la lightbox
   */
  constructor(urlImage, images, urlTitre, titres, video) {
    this.element = this.buildDOM(urlImage);
    this.images = images;
    this.loadImage(urlImage);
    this.video = video;
    this.title = titres;
    this.loadTitle(urlTitre);
    // console.log(this.title);

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
    image.setAttribute("alt", "");
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
  loadTitle(url) {
    this.urltest = null;
    this.urltest = url;
    const container = this.element.querySelector(".lightbox__container");
    const title = document.createElement("h2");
    title.classList.add("cardsTitle");
    container.appendChild(title);
    title.innerHTML = this.urltest;
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

    let t = this.title.findIndex((element) => element === this.urltest);
    if (t === this.title.length - 1) {
      i = -1;
    }
    this.loadTitle(this.title[i + 1]);
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

    let t = this.title.findIndex((element) => element === this.urltest);
    if (t === 0) {
      i = this.title.length;
    }
    this.loadTitle(this.title[i - 1]);
  }

  /**
   * @param {string} url URL de l'image
   * @return {HTMLElement}
   */
  buildDOM() {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `<button class="lightbox__close">Fermer</button>
    <button class="lightbox__next">Suivant</button>
    <button class="lightbox__prev">Précédent</button>
    <div class="lightbox__container">
    </div>`;
    const closeLightbox = this.element.firstChild;
    console.log(closeLightbox);
    closeLightbox.focus();
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
