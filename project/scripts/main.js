// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const currentYearSpan = document.getElementById('currentYear');
const lastModifiedSpan = document.getElementById('lastModified');
const convertBtn = document.getElementById('convertBtn');
const celsiusInput = document.getElementById('celsius');
const resultDiv = document.getElementById('result');
const newsForm = document.getElementById('newsForm');
const newsContainer = document.getElementById('news-container');

// 1. Navigation Hamburger
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// 2. Update Footer Dates
function updateDates() {
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;
    
    currentYearSpan.textContent = currentYear;
    lastModifiedSpan.textContent = lastModified;
}

// 3. Temperature Converter Function
function convertToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

convertBtn.addEventListener('click', () => {
    const celsius = parseFloat(celsiusInput.value);
    
    if (isNaN(celsius)) {
        resultDiv.textContent = 'Veuillez entrer un nombre valide';
        resultDiv.style.color = 'var(--secondary-red)';
        return;
    }
    
    const fahrenheit = convertToFahrenheit(celsius);
    resultDiv.textContent = `${celsius}°C = ${fahrenheit.toFixed(1)}°F`;
    resultDiv.style.color = 'var(--primary-blue)';
    
    // Store last conversion in localStorage
    localStorage.setItem('lastConversion', JSON.stringify({
        celsius: celsius,
        fahrenheit: fahrenheit,
        date: new Date().toISOString()
    }));
});

// 4. News Management with LocalStorage
class NewsManager {
    constructor() {
        this.newsKey = 'haitiNews';
        this.news = this.loadNews();
        this.renderNews();
    }
    
    loadNews() {
        const storedNews = localStorage.getItem(this.newsKey);
        return storedNews ? JSON.parse(storedNews) : [
            {
                id: 1,
                title: 'Festival du Rhum Haïtien',
                content: 'Le festival annuel du rhum aura lieu en décembre à Port-au-Prince.',
                date: '2024-11-15'
            },
            {
                id: 2,
                title: 'Exposition d\'Art Contemporain',
                content: 'Nouvelle exposition au Musée d\'Art Haïtien à compter du 20 novembre.',
                date: '2024-11-10'
            }
        ];
    }
    
    saveNews() {
        localStorage.setItem(this.newsKey, JSON.stringify(this.news));
    }
    
    addNews(title, content) {
        const newNews = {
            id: Date.now(),
            title: title,
            content: content,
            date: new Date().toISOString().split('T')[0]
        };
        
        this.news.unshift(newNews);
        this.saveNews();
        this.renderNews();
        return newNews;
    }
    
    renderNews() {
        if (!newsContainer) return;
        
        newsContainer.innerHTML = '';
        
        this.news.forEach(item => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <h4>${item.title}</h4>
                <p>${item.content}</p>
                <small>Publié le: ${item.date}</small>
            `;
            newsContainer.appendChild(newsItem);
        });
    }
}

// Initialize News Manager
const newsManager = new NewsManager();

// 5. Handle News Form Submission
if (newsForm) {
    newsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const title = document.getElementById('newsTitle').value;
        const content = document.getElementById('newsContent').value;
        
        if (title && content) {
            newsManager.addNews(title, content);
            newsForm.reset();
            
            // Show success message
            alert('Actualité ajoutée avec succès!');
        }
    });
}

// 6. Array Methods Example
const haitianCities = ['Port-au-Prince', 'Cap-Haïtien', 'Gonaïves', 'Jacmel', 'Les Cayes'];

function displayCities() {
    // Using array methods: map, filter, forEach
    const formattedCities = haitianCities.map(city => `<li>${city}</li>`).join('');
    
    // Check if the city list already exists to avoid duplication
    let cityList = document.getElementById('city-list');
    if (!cityList) {
        const citySection = document.createElement('section');
        citySection.className = 'city-section';
        citySection.innerHTML = `
            <h3>Villes Principales d'Haïti</h3>
            <ul id="city-list">${formattedCities}</ul>
        `;
        document.querySelector('main').appendChild(citySection);
    } else {
        // Update the city list if it already exists
        cityList.innerHTML = formattedCities;
    }
}

// 7. Template Literals Example
function createWelcomeMessage(name) {
    // Ensure the name is properly capitalized
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    return `Bienvenue ${formattedName} sur notre site dédié à la découverte d'Haïti!`;
}

// 8. Conditional Branching Example
function checkTouristSeason(month) {
    if (month >= 12 || month <= 3) {
        return "Haute saison touristique - Meilleure période pour visiter";
    } else if (month >= 4 && month <= 6) {
        return "Saison intermédiaire - Bonnes conditions";
    } else {
        return "Basse saison - Moins de touristes";
    }
}

// 9. DOM Manipulation - Create dynamic content
function createDynamicContent() {
    // Create weather info section
    const weatherSection = document.createElement('div');
    weatherSection.className = 'weather-info';
    weatherSection.innerHTML = `
        <h3>Climat Haïtien</h3>
        <p>Climat tropical avec deux saisons principales</p>
        <p>Saison sèche: Décembre à Avril</p>
        <p>Saison des pluies: Mai à Novembre</p>
    `;
    
    // Insert after interactive section
    const interactiveSection = document.querySelector('.interactive-section');
    if (interactiveSection) {
        interactiveSection.parentNode.insertBefore(weatherSection, interactiveSection.nextSibling);
    }
}

// 10. Event Listeners for Gallery Images
document.addEventListener('DOMContentLoaded', () => {
    // Initialize everything
    updateDates();
    displayCities();
    createDynamicContent();
    
    // Add click events to gallery images
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <img src="${this.src}" alt="${this.alt}">
                    <button class="close-modal">×</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal
            modal.querySelector('.close-modal').addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            // Close on background click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    });
    
    // Display Haiti info using template literal
    const haitiInfoDiv = document.createElement('div');
    haitiInfoDiv.className = 'haiti-info';
    haitiInfoDiv.innerHTML = `
        <h3>${haitiInfo.name}</h3>
        <p>${haitiInfo.getDescription()}</p>
        <p>${haitiInfo.getLanguages()}</p>
        <p>Population: ${haitiInfo.population.toLocaleString()} habitants</p>
    `;
    
    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.insertBefore(haitiInfoDiv, mainElement.firstChild);
    }
    
    // Display tourist season info
    const currentMonth = new Date().getMonth() + 1;
    const seasonInfo = document.createElement('div');
    seasonInfo.className = 'season-info';
    seasonInfo.innerHTML = `
        <p><strong>Conseil de voyage:</strong> ${checkTouristSeason(currentMonth)}</p>
    `;
    
    const tourismSection = document.querySelector('.interactive-section');
    if (tourismSection) {
        tourismSection.appendChild(seasonInfo);
    }
});

// 11. Lazy Loading Enhancement
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Add modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    }
    
    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .modal-content img {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 8px;
    }
    
    .close-modal {
        position: absolute;
        top: -40px;
        right: 0;
        background: var(--secondary-red);
        color: white;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
    }
`;
document.head.appendChild(modalStyles);