export function launchModal() {
  const modalBg = document.querySelector("#formulaire");
  modalBg.style.display = "block";
  modalBg.removeAttribute("role");
  modalBg.querySelector("#form__close ").focus();
  const tabHidden = document.querySelector("main");
  tabHidden.style.display = "none";
}

export function closeModal() {
  const modalBg = document.querySelector("#formulaire");
  modalBg.style.display = "none";
  modalBg.setAttribute("role", "dialog");
  const tabHidden = document.querySelector("main");
  tabHidden.style.display = "block";
}

// Commande Boucle dans le formulaire
document.addEventListener("keydown", (e) => {
  const submitBtn = document.querySelector(".contact_button");
  const closeBtn = document.querySelector("#form__close");
  if (e.key === "Tab") {
    if (document.activeElement === submitBtn) {
      e.preventDefault();
      closeBtn.focus();
    }
  }
});
