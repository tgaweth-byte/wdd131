// Script pour les dates dynamiques (critère 7)

// Fonction pour obtenir l'année courante
function getCurrentYear() {
    // Retourne l'année actuelle
    return new Date().getFullYear();
}

// Fonction pour formater la date de dernière modification
function getLastModifiedDate() {
    // Obtient la date de dernière modification du document
    const lastModified = document.lastModified;
    // Retourne la date formatée
    return lastModified;
}

// Fonction principale pour initialiser les dates
function initializeDates() {
    // Met à jour l'année courante dans le footer
    document.getElementById('currentyear').textContent = getCurrentYear();
    // Met à jour la date de dernière modification
    document.getElementById('lastmodified').textContent = getLastModifiedDate();
}

// Initialise les dates quand le DOM est chargé
document.addEventListener('DOMContentLoaded', initializeDates);