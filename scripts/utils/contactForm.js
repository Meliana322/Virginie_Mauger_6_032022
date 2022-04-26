// console.log(modalContainer);
export function launchModal() {
  const modalBg = document.querySelector("#formulaire");
  modalBg.style.display = "block";
}

export function closeModal() {
  const modalBg = document.querySelector("#formulaire");
  modalBg.style.display = "none";
}
