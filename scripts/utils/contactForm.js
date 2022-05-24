// console.log(modalContainer);
export function launchModal() {
  const modalBg = document.querySelector("#formulaire");
  modalBg.style.display = "block";
  console.log(modalBg.querySelector("#first"));
  modalBg.querySelector("#form__close ").focus();
}

export function closeModal() {
  const modalBg = document.querySelector("#formulaire");
  modalBg.style.display = "none";
}
