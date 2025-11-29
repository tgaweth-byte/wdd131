let d = new Date();
document.getElementById("currentYear").innerHTML = `&copy;${d.getFullYear()}`;
document.querySelector('#lastModified').textContent = `Last Modification: ${document.lastModified}`;

// Navigation Hamburger
const hambutton = document.querySelector('#hambutton');
hambutton.addEventListener('click', () => {
    document.querySelector('#navmenu').classList.toggle('show');
    hambutton.classList.toggle('show');
});

// Temple Array avec 10 éléments (7 originaux + 3 nouveaux)
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // NOUVEAUX TEMPLES AJOUTÉS
    {
        templeName: "Salt Lake City Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253000,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/7761e87183d3a9d62055ebb8b18035d6f7441789/full/3840%2C/0/default"
    },
    {
        templeName: "Provo City Center Utah",
        location: "Provo, Utah, United States",
        dedicated: "2016, March, 20",
        area: 85084,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/ff8c7df0c3ca5323549b8f87790ec42c0ce18662/full/3840%2C/0/default"
    },
    {
        templeName: "Monticello Utah",
        location: "Monticello, Utah, United States",
        dedicated: "1998, July, 26",
        area: 7200,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/2a834bc01de0a14834b2fe1827b74d9bc20a74ca/full/3840%2C/0/default"
    }
];

// Fonctions de filtrage
function filterTemples(criteria) {
    const grid = document.querySelector('.res-grid');
    grid.innerHTML = ''; // Vider la grille
    
    let filteredTemples = temples;
    
    switch(criteria) {
        case 'old':
            filteredTemples = temples.filter(temple => {
                const year = parseInt(temple.dedicated.split(',')[0]);
                return year < 1900;
            });
            break;
        case 'new':
            filteredTemples = temples.filter(temple => {
                const year = parseInt(temple.dedicated.split(',')[0]);
                return year > 2000;
            });
            break;
        case 'large':
            filteredTemples = temples.filter(temple => temple.area > 90000);
            break;
        case 'small':
            filteredTemples = temples.filter(temple => temple.area < 10000);
            break;
        case 'home':
        default:
            filteredTemples = temples;
    }
    
    createTempleCards(filteredTemples);
    updateActiveFilter(criteria);
}

function updateActiveFilter(activeCriteria) {
    // Retirer la classe active de tous les boutons
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Ajouter la classe active au bouton cliqué
    const activeLink = document.querySelector(`nav a[onclick*="${activeCriteria}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function createTempleCards(templesArray) {
    const grid = document.querySelector('.res-grid');
    
    templesArray.forEach(temple => {
        let card = document.createElement("section");
        let name = document.createElement("h3");
        let location = document.createElement("p");
        let dedication = document.createElement("p");
        let area = document.createElement("p");
        let img = document.createElement("img");

        name.textContent = temple.templeName;
        location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;
        dedication.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;
        area.innerHTML = `<span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft`;
        img.setAttribute("src", temple.imageUrl);
        img.setAttribute("alt", `${temple.templeName} Temple`);
        img.setAttribute("loading", "lazy");
        img.setAttribute("width", "400");
        img.setAttribute("height", "250");

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedication);
        card.appendChild(area);
        card.appendChild(img);

        grid.appendChild(card);
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    createTempleCards(temples); // Afficher tous les temples au chargement
    
    // Configurer les écouteurs d'événements pour les filtres
    document.querySelector('nav a[onclick*="home"]').addEventListener('click', function(e) {
        e.preventDefault();
        filterTemples('home');
    });
    
    document.querySelector('nav a[onclick*="old"]').addEventListener('click', function(e) {
        e.preventDefault();
        filterTemples('old');
    });
    
    document.querySelector('nav a[onclick*="new"]').addEventListener('click', function(e) {
        e.preventDefault();
        filterTemples('new');
    });
    
    document.querySelector('nav a[onclick*="large"]').addEventListener('click', function(e) {
        e.preventDefault();
        filterTemples('large');
    });
    
    document.querySelector('nav a[onclick*="small"]').addEventListener('click', function(e) {
        e.preventDefault();
        filterTemples('small');
    });
});