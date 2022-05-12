/**
 * @property {HTMLElement} element
 */

export class Lightbox {
  static init() {
    const links = document
      .querySelectorAll(
        '.wrapper .gallery a[href$=".jpg"], .wrapper .gallery a[href$=".png"], .wrapper .gallery a[href$=".jpeg"]'
      )
      .forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          new Lightbox(e.currentTarget.getAttribute("href"));
        });
      });
  }
  /**
   *
   * @param {string} url URL de l'image
   */
  constructor(url) {
    const element = this.buildDOM(url);
    // // this.loadImage(url);
    document.body.appendChild(element);
  }

  // /**
  //  * @param {string} url URL de l'image
  //  */
  // loadImage(url) {
  //   const image = new Image();
  //   const container = this.element.querySelector(".lightbox__container");
  //   const loader = document.createElement("div");
  //   loader.classList.add("lightbox__loader");
  //   container.appendChild(loader);
  //   image.onload = function () {
  //     container.removeChild(loader);
  //     container.appendChild(image);
  //   };
  //   image.src = url;
  // }

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
        <img src="https://picsum.photos/id/1/900/900" alt="">
      </div>`;
    // dom
    //   .querySelector(".lightbox__close")
    //   .addEventListener("click", this.close.bind(this));
    // dom
    //   .querySelector(".lightbox__next")
    //   .addEventListener("click", this.next.bind(this));
    // dom
    //   .querySelector(".lightbox__prev")
    //   .addEventListener("click", this.prev.bind(this));
    return dom;
  }
}

Lightbox.init();
