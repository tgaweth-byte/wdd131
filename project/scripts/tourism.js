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
    
    // Destination details
    const detailButtons = document.querySelectorAll('.btn-details');
    const destinationInfo = {
        citadelle: "Citadelle La Ferrière: Construite entre 1805-1820. Tarif: 25$. Guide obligatoire. Meilleure période: Décembre-Avril. Durée visite: 3-4 heures.",
        jacmel: "Jacmel: Distance Port-au-Prince: 3h. Spécialités: Masques carnaval, plages. Événement: Carnaval de Jacmel (février). Hébergement: Guesthouses et hôtels.",
        labadee: "Labadee: Station privée Royal Caribbean. Activités: Plage, tyrolienne, kayak. Accès: Croisière ou excursion organisée.",
        macaya: "Parc Macaya: Guide obligatoire. Difficulté: Moyenne à difficile. Biodiversité: 141 espèces d'oiseaux. Camping possible."
    };
    
    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            const destination = button.dataset.destination;
            alert(destinationInfo[destination]);
        });
    });
    
    // Trip planner
    const generateBtn = document.getElementById('generateItinerary');
    const itineraryContent = document.getElementById('itineraryContent');
    
    generateBtn.addEventListener('click', () => {
        const duration = document.getElementById('trip-duration').value;
        const budget = document.getElementById('budget').value;
        const interests = Array.from(document.querySelectorAll('input[name="interest"]:checked'))
            .map(cb => cb.value);
        
        // Generate itinerary based on selections
        let itinerary = `<h4>Itinéraire ${duration} jours - Budget ${budget}</h4>`;
        itinerary += `<p><strong>Intérêts sélectionnés:</strong> ${interests.join(', ')}</p>`;
        itinerary += `<div class="day-plans">`;
        
        // Sample itinerary generation logic
        if (duration == '3') {
            itinerary += `
                <div class="day">
                    <h5>Jour 1: Arrivée à Port-au-Prince</h5>
                    <p>Visite du Musée du Panthéon National</p>
                </div>
                <div class="day">
                    <h5>Jour 2: Citadelle La Ferrière</h5>
                    <p>Excursion journée complète</p>
                </div>
                <div class="day">
                    <h5>Jour 3: Départ</h5>
                    <p>Shopping d'artisanat local</p>
                </div>
            `;
        } else if (duration == '7') {
            itinerary += `
                <div class="day">
                    <h5>Jours 1-2: Port-au-Prince</h5>
                    <p>Musées, art, culture urbaine</p>
                </div>
                <div class="day">
                    <h5>Jours 3-4: Nord</h5>
                    <p>Citadelle, plages du Nord</p>
                </div>
                <div class="day">
                    <h5>Jours 5-6: Jacmel</h5>
                    <p>Plages, artisanat, architecture</p>
                </div>
                <div class="day">
                    <h5>Jour 7: Retour</h5>
                    <p>Souvenirs et départ</p>
                </div>
            `;
        }
        
        itinerary += `</div>`;
        
        // Add budget tips
        if (budget === 'economy') {
            itinerary += `<p class="budget-tip"><strong>Conseil budget:</strong> Privilégiez les guesthouses et les transports collectifs.</p>`;
        } else if (budget === 'luxury') {
            itinerary += `<p class="budget-tip"><strong>Conseil budget:</strong> Hôtels 5 étoiles et chauffeur privé recommandés.</p>`;
        }
        
        itineraryContent.innerHTML = itinerary;
        
        // Save itinerary to localStorage
        const itineraryData = {
            duration: duration,
            budget: budget,
            interests: interests,
            generatedAt: new Date().toISOString()
        };
        
        localStorage.setItem('lastItinerary', JSON.stringify(itineraryData));
    });
    
    // Load last itinerary if exists
    const lastItinerary = JSON.parse(localStorage.getItem('lastItinerary'));
    if (lastItinerary) {
        console.log('Dernier itinéraire sauvegardé:', lastItinerary);
    }
    
    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });
    
    // Initialize all FAQ answers as hidden
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.style.display = 'none';
    });
});