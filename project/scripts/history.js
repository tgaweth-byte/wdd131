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
    
    // Figures historiques - modal
    const figureButtons = document.querySelectorAll('.btn-more');
    const figureDetails = {
        toussaint: "Toussaint Louverture, né esclave, devint le principal leader de la Révolution haïtienne. Capturé par les Français, il mourut en prison en France en 1803.",
        dessalines: "Jean-Jacques Dessalines, ancien esclave, proclama l'indépendance d'Haïti le 1er janvier 1804 et devint le premier empereur sous le nom de Jacques Ier.",
        henri: "Henri Christophe, ancien esclave et chef militaire, devint président puis roi d'Haïti. Il fit construire la Citadelle La Ferrière, monument classé UNESCO."
    };
    
    figureButtons.forEach(button => {
        button.addEventListener('click', () => {
            const figure = button.dataset.figure;
            alert(figureDetails[figure]);
        });
    });
    
    // Quiz interactif
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizResult = document.getElementById('quiz-result');
    
    quizOptions.forEach(option => {
        option.addEventListener('click', () => {
            const answer = option.dataset.answer;
            
            // Reset all buttons
            quizOptions.forEach(opt => {
                opt.style.backgroundColor = '';
                opt.style.color = '';
            });
            
            if (answer === '1804') {
                option.style.backgroundColor = '#1B4D3E';
                option.style.color = 'white';
                quizResult.textContent = 'Correct! Haïti a proclamé son indépendance le 1er janvier 1804.';
                quizResult.style.color = '#1B4D3E';
            } else {
                option.style.backgroundColor = '#D21034';
                option.style.color = 'white';
                quizResult.textContent = 'Incorrect. La réponse correcte est 1804.';
                quizResult.style.color = '#D21034';
            }
        });
    });
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach(item => observer.observe(item));
});