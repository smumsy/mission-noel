// --- CONFIGURATION A MODIFIER ---
// 1. Le Code Secret (met ce que tu veux, en majuscules)
const SECRET_CODE = "JA2025"; 

// 2. La Date cible : Vendredi 19 Décembre 2025 à 15h45
const targetDate = new Date("December 19, 2025 15:45:00").getTime();

// 3. Les Indices (Date d'apparition et Texte)
const HINTS_CONFIG = [
    { date: new Date("December 16, 2025 15:45:00").getTime(), text: "Indice 1 : Le code secret est bien present sur le bas de la lettre corrompu..." },
    { date: new Date("December 17, 2025 15:45:00").getTime(), text: "Indice 2 : Si la chaleur de ton coeur ne suffit pas, essaies en une autre..." },
    { date: new Date("December 18, 2025 15:45:00").getTime(), text: "Indice 3 : Mais pourquoi cette lettre est imbibée d'une odeur agrumeuse..." }
];
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
const nextHintDateEl = document.getElementById("next-hint-date"); // NOUVEL ÉLÉMENT

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
    let nextHint = null;

    // 1. Itère sur la configuration pour afficher les indices disponibles et trouver le prochain
    for (const hint of HINTS_CONFIG) {
        if (currentTime >= hint.date) {
            // L'indice est disponible
            hintsHTML += `<li>${hint.text}</li>`;
            hasHint = true;
        } else if (!nextHint) {
            // C'est le premier indice non disponible que l'on rencontre (le prochain)
            nextHint = hint;
        }
    }
    
    // 2. Affichage des indices
    if (hasHint) {
        noHintMsg.classList.add("hidden");
        hintsList.innerHTML = hintsHTML;
    } else {
        noHintMsg.classList.remove("hidden");
    }
    
    // 3. Affichage de la date du prochain indice
    if (nextHint) {
        // Formatage de la date en français (ex: "Mercredi 17 Décembre à 20h00")
        const options = { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
        const nextDateFormatted = new Date(nextHint.date).toLocaleDateString('fr-FR', options);
        
        // On met la première lettre en majuscule
        const capitalizedDate = nextDateFormatted.charAt(0).toUpperCase() + nextDateFormatted.slice(1);
        
        nextHintDateEl.innerHTML = `Prochain indice disponible le : ${capitalizedDate}`;
        nextHintDateEl.classList.remove("hidden");
    } else {
        // Tous les indices ont été dévoilés
        nextHintDateEl.innerHTML = `Tous les indices ont été dévoilés !`;
    }
}


// Fonction pour vérifier le code secret
function checkCode() {
    // La fonction reste inchangée
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
