// Stockage des références à chacun des contrôles
let playPauseBtn = document.querySelector(".playpause");
let stopBtn = document.querySelector(".stop");
let rwdBtn = document.querySelector(".rwd");
let fwdBtn = document.querySelector(".fwd");
let timeLabel = document.querySelector(".time");
// Référence au lecteur vidéo / audio
let player = document.querySelector("video");
// suppression des contrôles natifs afin qu'ils ne gênent pas les contrôles personnalisés
player.removeAttribute("controls");

// configuration du bouton lecture / pause avec une fonction conditionnelle
playPauseBtn.onclick = function () {
  if (player.paused) {
    player.play();
    playPauseBtn.textContent = "Pause";
  } else {
    player.pause();
    playPauseBtn.textContent = "Play";
  }
};

// Contrôle du bouton d'arrêt
stopBtn.onclick = function () {
  player.pause();
  player.currentTime = 0;
  playPauseBtn.textContent = "Play";
};

rwdBtn.onclick = function () {
  player.currentTime -= 3;
};
// Boutons de rembobinage et d’avance rapide
fwdBtn.onclick = function () {
  player.currentTime += 3;
  if (player.currentTime >= player.duration || player.paused) {
    //vérifie si la durée currentTime est supérieure à la durée totale
    //  du support ou si le support n'est pas en cours de lecture lorsque le bouton Fwd est enfoncé
    // Si l'une ou l'autre de ces conditions est vraie, nous arrêtons simplement la vidéo pour éviter
    // que l'interface utilisateur ne se détériore si elle tente d'effectuer une avance rapide lorsque
    // la vidéo n'est pas en cours de lecture ou si la fin de la vidéo est terminée.
    player.pause();
    player.currentTime = 0;
    playPauseBtn.textContent = "Play";
  }
};
// Contrôle de l’affichage du temps écoulé
player.ontimeupdate = function () {
  let minutes = Math.floor(player.currentTime / 60);
  let seconds = Math.floor(player.currentTime - minutes * 60);
  let minuteValue;
  let secondValue;

  if (minutes < 10) {
    minuteValue = "0" + minutes;
  } else {
    minuteValue = minutes;
  }

  if (seconds < 10) {
    secondValue = "0" + seconds;
  } else {
    secondValue = seconds;
  }

  mediaTime = minuteValue + ":" + secondValue;
  timeLabel.textContent = mediaTime;
};
//   Chaque fois que l'heure est mise à jour (une fois par seconde),
//  activation de la fonction. Calcule le nombre de minutes et de secondes à partir
// de la valeur actuelle donnée en secondes, ajoute un 0 au début si la valeur de
// minute ou de seconde est inférieure à 10, puis crée la lecture d'affichage et
// l'ajoute à l'étiquette de temps.
