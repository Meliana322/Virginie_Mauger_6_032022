// console.log(modalContainer);
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
