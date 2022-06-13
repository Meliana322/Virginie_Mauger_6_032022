/**
 * @property {HTMLElement} element
 * @property {string[]} imagesChemin des images de la lightbox
 * @property {string} url image actuellement affichée
 */

export class Lightbox {
  static init() {
    // Sélection de tous les emplacement des images et vidéos
    const links = Array.from(
      document.querySelectorAll(
        'section.wrapper img[src$=".jpg"], section.wrapper video source[src$=".mp4"]'
      )
    );
    // Création d'un nouveau tableau avec tous les titres des médias
    const linksTitles = Array.from(
      document.querySelectorAll(".galleryDescription h2")
    );
    let title = []; // Je récupère tous les titres dans un tableau
    for (let i = 0; i < linksTitles.length; i++) {
      title.push(linksTitles[i].textContent);
    }

    const galleryLightbox = links.map((link) => link.getAttribute("src"));

    const gallery = document.querySelectorAll(".gallery");

    // Pour chaque lien
    gallery.forEach((link) => {
      const imagetest = link.querySelector("a");

      // Au clic lance la fonction qui prend en paramètre l'événement
      imagetest.addEventListener("click", (e) => {
        e.preventDefault();
        const source = imagetest.querySelector("[src]").getAttribute("src");
        const test = link.querySelector("h2").textContent;
        // Initialise une nouvelle Lightbox
        new Lightbox(source, galleryLightbox, test, title);
        const tabHidden = document.querySelectorAll("header, main");
        tabHidden.forEach((elt) => (elt.style.display = "none"));
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
    this.loadImage(urlImage, urlTitre);
    this.video = video;
    this.title = titres;
    this.loadTitle(urlTitre);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);

    document.addEventListener("keyup", this.onKeyUp);
  }

  // /**
  //  * @param {string} url URL de l'image
  //  */
  loadImage(url, title) {
    const main = document.getElementById("main");
    main.ariaHidden = true;
    this.url = null;
    const image = document.createElement("img");
    image.setAttribute("role", "img");
    const video = document.createElement("video");
    const container = this.element.querySelector(".lightbox__container");
    const loader = document.createElement("div");
    loader.classList.add("lightbox__loader");
    container.innerHTML = "";
    container.appendChild(loader);
    container.removeChild(loader);
    video.setAttribute("controls", "");
    image.classList.add("cardsImage");
    image.setAttribute("alt", title);
    image.setAttribute("aria-label", title);
    video.classList.add("video");
    this.url = url;
    let extensionsMedias = [];
    for (let i = 0; i < this.images.length; i++) {
      // Split()  divise une chaîne de caractères en une liste ordonnée de sous-chaînes, place ces sous-chaînes dans un tableau et retourne le tableau
      // pop() supprime le dernier élément d'un tableau et retourne cet élément
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
    this.urlTitle = null;
    this.urlTitle = url;
    const container = this.element.querySelector(".lightbox__container");
    const title = document.createElement("h2");
    title.classList.add("cardsTitle");
    container.appendChild(title);
    title.innerHTML = this.urlTitle;
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
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
    const tabHidden = document.querySelectorAll("header, main");
    tabHidden.forEach((elt) => (elt.style.display = "block"));
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
    this.loadImage(this.images[i + 1], this.title[i + 1]);

    let t = this.title.findIndex((element) => element === this.urlTitle);
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
    this.loadImage(this.images[i - 1], this.title[i - 1]);

    let t = this.title.findIndex((element) => element === this.urlTitle);
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
    <button class="lightbox__prev">Précédent</button>
    <button class="lightbox__next">Suivant</button>
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
// Commande Boucle dans la Lightbox
document.addEventListener("keydown", (e) => {
  const nextBtn = document.querySelector(".lightbox__next");
  const ligthboxClose = document.querySelector(".lightbox__close");
  if (e.key === "Tab") {
    if (document.activeElement === nextBtn) {
      e.preventDefault();
      ligthboxClose.focus();
    }
  }
});
