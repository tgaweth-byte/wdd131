// Navigation hamburger
document.addEventListener('DOMContentLoaded', () => {
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
    
    // Interactive map functionality
    const regions = document.querySelectorAll('.map-regions .region');
    const regionInfo = {
        north: "Région Nord: Cap-Haïtien, Plaine du Nord, riche en histoire coloniale.",
        west: "Région Ouest: Port-au-Prince, capitale économique et politique.",
        south: "Région Sud: Les Cayes, Jacmel, célèbre pour son carnaval et son artisanat.",
        southeast: "Région Sud-Est: Zone montagneuse avec forêts tropicales.",
        central: "Région Centre: Plateau Central, grenier agricole d'Haïti."
    };
    
    regions.forEach(region => {
        region.addEventListener('click', () => {
            const regionName = region.dataset.region;
            alert(regionInfo[regionName]);
        });
        
        region.addEventListener('mouseenter', () => {
            region.style.opacity = '0.8';
        });
        
        region.addEventListener('mouseleave', () => {
            region.style.opacity = '1';
        });
    });
});