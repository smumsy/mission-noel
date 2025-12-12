// --- CONFIGURATION A MODIFIER ---
// 1. Le Code Secret (met ce que tu veux, en majuscules)
const SECRET_CODE = "LUTIN2025"; 

// 2. La Date cible : Vendredi 19 Décembre 2025 à 15h45
const targetDate = new Date("December 12, 2025 14:4:00").getTime();
// 3. Les Indices (Date d'apparition et Texte)
// Indice 1 : Mercredi 17 à 20h00
const hint1Date = new Date("December 17, 2025 20:00:00").getTime();
const hint1Text = "Indice 1 : Regarde sous le tapis du salon...";

// Indice 2 : Jeudi 18 à 20h00
const hint2Date = new Date("December 18, 2025 20:00:00").getTime();
const hint2Text = "Indice 2 : Ce n'est pas loin de la machine à café...";

// ---------------------------------

// Éléments du DOM
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const secretInput = document.getElementById("secret-code");
const errorMsg = document.getElementById("error-msg");
const mainDisplay = document.getElementById("main-display");
const successLetter = document.getElementById("success-letter");
const gameOver = document.getElementById("game-over");
const hintsList = document.getElementById("hints-list");
const noHintMsg = document.getElementById("no-hint");

// Fonction de mise à jour du compte à rebours
const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Calculs de temps
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Affichage
    daysEl.innerText = days < 10 ? '0' + days : days;
    hoursEl.innerText = hours < 10 ? '0' + hours : hours;
    minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;

    // GESTION DES INDICES
    checkHints(now);

    // FIN DU COMPTE A REBOURS
    if (distance < 0) {
        clearInterval(countdown);
        // Si le temps est écoulé, on cache le jeu et on affiche le message de défaite
        mainDisplay.classList.add("hidden");
        gameOver.classList.remove("hidden");
    }
}, 1000);

// Fonction pour vérifier et afficher les indices
function checkHints(currentTime) {
    let hintsHTML = "";
    let hasHint = false;

    if (currentTime >= hint1Date) {
        hintsHTML += `<li>${hint1Text}</li>`;
        hasHint = true;
    }
    
    if (currentTime >= hint2Date) {
        hintsHTML += `<li>${hint2Text}</li>`;
        hasHint = true;
    }

    if (hasHint) {
        noHintMsg.classList.add("hidden");
        hintsList.innerHTML = hintsHTML;
    }
}

// Fonction pour vérifier le code secret
function checkCode() {
    const userCode = secretInput.value.trim().toUpperCase();

    if (userCode === SECRET_CODE) {
        // VICTOIRE !
        mainDisplay.classList.add("hidden");
        successLetter.classList.remove("hidden");
        // Arrêter le chrono en arrière-plan (optionnel mais propre)
        clearInterval(countdown);
    } else {
        // Code faux
        errorMsg.classList.remove("hidden");
        // Animation de secousse
        secretInput.style.border = "2px solid red";
        setTimeout(() => {
            secretInput.style.border = "none";
            errorMsg.classList.add("hidden");
        }, 3000);
    }
}

// Permettre la validation avec la touche Entrée
secretInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkCode();
    }
});
