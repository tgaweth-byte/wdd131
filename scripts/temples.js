// Script pour les fonctionnalités interactives

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

// Fonction pour initialiser les dates dynamiques (Critère 9)
function initializeDates() {
    // Met à jour l'année courante dans le footer
    document.getElementById('currentyear').textContent = getCurrentYear();
    // Met à jour la date de dernière modification
    document.getElementById('lastmodified').textContent = getLastModifiedDate();
}

// Fonction pour gérer le menu hamburger (Critère 6)
function setupHamburgerMenu() {
    // Sélectionne le bouton hamburger
    const hamburger = document.getElementById('hamburger');
    // Sélectionne le menu de navigation
    const navMenu = document.getElementById('nav-menu');
    
    // Vérifie si les éléments existent
    if (hamburger && navMenu) {
        // Ajoute un écouteur d'événement au clic
        hamburger.addEventListener('click', () => {
            // Bascule la classe 'active' sur le menu
            navMenu.classList.toggle('active');
            // Bascule la classe 'active' sur le bouton hamburger
            hamburger.classList.toggle('active');
        });
        
        // Ferme le menu quand on clique à l'extérieur
        document.addEventListener('click', (event) => {
            // Vérifie si le clic est en dehors du menu et du bouton
            if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
                // Retire la classe 'active'
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Fonction pour fermer le menu au clic sur un lien
function setupMenuLinks() {
    // Sélectionne tous les liens du menu
    const menuLinks = document.querySelectorAll('.nav-menu a');
    // Sélectionne le menu et le bouton hamburger
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    
    // Ajoute un écouteur à chaque lien
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Ferme le menu mobile après clic
            if (navMenu && hamburger) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Fonction d'initialisation principale
function init() {
    // Initialise les dates dynamiques
    initializeDates();
    // Configure le menu hamburger
    setupHamburgerMenu();
    // Configure les liens du menu
    setupMenuLinks();
    
    // Log de confirmation
    console.log('Album photo initialisé avec succès!');
}

// Attend que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', init);