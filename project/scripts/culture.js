document.addEventListener('DOMContentLoaded', () => {
    // Navigation hamburger
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Update dates in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;
    
    // Music player simulation
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentTrack = document.getElementById('currentTrack');
    
    const tracks = [
        "Kompa - Tabou Combo",
        "Racine - Boukman Eksperyans",
        "Twoubadou - Coupé Cloué",
        "Mizik Rasin - RAM",
        "Compas Direct - Nemours Jean-Baptiste"
    ];
    
    let currentTrackIndex = 0;
    
    playBtn.addEventListener('click', () => {
        currentTrack.textContent = `🎵 En cours: ${tracks[currentTrackIndex]}`;
    });
    
    pauseBtn.addEventListener('click', () => {
        currentTrack.textContent = "⏸️ Musique en pause";
    });
    
    nextBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        currentTrack.textContent = `▶️ Prochain: ${tracks[currentTrackIndex]}`;
    });
    
    // Recipe buttons
    const recipeButtons = document.querySelectorAll('.recipe-btn');
    const recipes = {
        griot: "RECETTE DU GRIOT: 1. Couper 1kg d'épaule de porc en cubes. 2. Marinier 4h avec jus d'orange, ail, piment, thym. 3. Faire bouillir 30min. 4. Frire jusqu'à doré. Servir avec riz et bananes.",
        soupe: "RECETTE SOUPE AU GIRAUMON: 1. Cuire 500g de giraumon. 2. Ajouter bœuf, carottes, navets. 3. Assaisonner avec épis. 4. Cuire 2h. Tradition du 1er janvier.",
        tasso: "RECETTE TASSO: 1. Couper bœuf en fines tranches. 2. Marinier avec sel, piment, épices. 3. Sécher au soleil 2-3 jours. 4. Conserver dans l'huile."
    };
    
    recipeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const recipe = button.dataset.recipe;
            alert(recipes[recipe]);
        });
    });
    
    // Translator
    const translateBtn = document.getElementById('translateBtn');
    const phraseInput = document.getElementById('phraseInput');
    const translationResult = document.getElementById('translationResult');
    
    const translations = {
        "bonjour": "bonjou",
        "merci": "mèsi",
        "comment allez-vous": "koman ou ye",
        "je m'appelle": "mwen rele",
        "au revoir": "orevwa",
        "bienvenue": "byenveni",
        "s'il vous plaît": "souple",
        "excusez-moi": "eskize m",
        "je t'aime": "mwen renmen ou",
        "bon appétit": "bon apeti"
    };
    
    translateBtn.addEventListener('click', () => {
        const phrase = phraseInput.value.toLowerCase().trim();
        
        if (phrase === "") {
            translationResult.textContent = "Veuillez entrer une phrase";
            return;
        }
        
        // Simple translation lookup
        let translated = "Traduction non disponible";
        
        for (const [french, creole] of Object.entries(translations)) {
            if (phrase.includes(french)) {
                translated = creole;
                break;
            }
        }
        
        translationResult.textContent = `Traduction: ${translated}`;
        translationResult.style.display = 'block';
        
        // Save to localStorage
        const translationHistory = JSON.parse(localStorage.getItem('translationHistory') || '[]');
        translationHistory.push({
            french: phrase,
            creole: translated,
            date: new Date().toISOString()
        });
        
        // Keep only last 10 translations
        if (translationHistory.length > 10) {
            translationHistory.shift();
        }
        
        localStorage.setItem('translationHistory', JSON.stringify(translationHistory));
    });
    
    // Load previous translation if exists
    const savedTranslations = JSON.parse(localStorage.getItem('translationHistory') || '[]');
    if (savedTranslations.length > 0) {
        console.log(`Historique des traductions: ${savedTranslations.length} entrées`);
    }
});