const modal = document.getElementById("divContactButton");
const modalBtn = document.getElementsByClassName("contactButton");

function displayModal() {
  modalBtn.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

// Ciblage des champs

const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const eMail = document.getElementById("email");

document
  .getElementById("contactModal")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    let error = "";

    // Prénom
    if (firstName.value.length < 2) {
      error = "Veuillez entrer 2 caractères ou plus pour ce champ";
      firstName.parentNode.setAttribute("data-error", error);
      firstName.parentNode.setAttribute("data-error-visible", true); // si data-error = true affiche moi le msg
    } else {
      firstName.parentNode.setAttribute("data-error-visible", false);
    }

    // Nom
    if (lastName.value.length < 2) {
      error = "Veuillez entrer 2 caractères ou plus pour ce champ";
      lastName.parentNode.setAttribute("data-error", error);
      lastName.parentNode.setAttribute("data-error-visible", true);
    } else {
      lastName.parentNode.setAttribute("data-error-visible", false);
    }
    // Email
    if (!eMail.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,64})+$/)) {
      error = "Merci de saisir une adresse mail valide";
      eMail.parentNode.setAttribute("data-error", error);
      eMail.parentNode.setAttribute("data-error-visible", true);
    } else {
      eMail.parentNode.setAttribute("data-error-visible", false);
    }

    // Disparition du formulaire, affichage de la modale d'envoi de formulaire
    if (error === "") {
      displayModal.style.display = "none";
      closeModal.style.display = "block";
    }
    // Disparition du formulaire, affichage de la modale d'envoi de formulaire
    if (error === "") {
      displayModal.style.display = "none";
      closeModal.style.display = "block";
    }
  });
