// Tableau des produits (Critère 7: Product Array - 5 pts)
const products = [
    {
      id: "fc-1888",
      name: "flux capacitor",
      averagerating: 4.5
    },
    {
      id: "fc-2050",
      name: "power laces",
      averagerating: 4.7
    },
    {
      id: "fs-1987",
      name: "time circuits",
      averagerating: 3.5
    },
    {
      id: "ac-2000",
      name: "low voltage reactor",
      averagerating: 3.9
    },
    {
      id: "jj-1969",
      name: "warp equalizer",
      averagerating: 5.0
    }
  ];
  
  // Populer dynamiquement le menu déroulant des produits
  function populateProductOptions() {
    const productSelect = document.getElementById('product_name');
    
    // Vider les options existantes sauf la première
    while (productSelect.options.length > 1) {
      productSelect.remove(1);
    }
    
    // Ajouter les options depuis le tableau
    products.forEach(product => {
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = product.name;
      productSelect.appendChild(option);
    });
  }
  
  // Critère 8: localStorage pour le suivi des révisions
  function initializeReviewCounter() {
    if (typeof Storage !== 'undefined') {
      // Initialiser le compteur s'il n'existe pas
      if (!localStorage.getItem('reviewCount')) {
        localStorage.setItem('reviewCount', '0');
      }
      
      // Récupérer et afficher le nombre de révisions (sur la page review.html)
      if (window.location.pathname.includes('review.html')) {
        const reviewCount = localStorage.getItem('reviewCount');
        const countElement = document.getElementById('reviewCount');
        if (countElement) {
          countElement.textContent = reviewCount;
        }
      }
    }
  }
  
  // Mettre à jour le compteur de révisions
  function updateReviewCount() {
    if (typeof Storage !== 'undefined') {
      let currentCount = parseInt(localStorage.getItem('reviewCount')) || 0;
      currentCount++;
      localStorage.setItem('reviewCount', currentCount.toString());
      return currentCount;
    }
    return 0;
  }
  
  // Gestionnaire d'événement pour la soumission du formulaire
  document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les options de produits
    if (document.getElementById('product_name')) {
      populateProductOptions();
    }
    
    // Initialiser le compteur de révisions
    initializeReviewCounter();
    
    // Gérer la soumission du formulaire
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', function(event) {
        // Mettre à jour le compteur
        updateReviewCount();
        
        // Pour démonstration, nous allons stocker les données dans localStorage
        const formData = new FormData(form);
        const reviewData = {};
        
        for (let [key, value] of formData.entries()) {
          if (key === 'features') {
            if (!reviewData[key]) reviewData[key] = [];
            reviewData[key].push(value);
          } else {
            reviewData[key] = value;
          }
        }
        
        // Stocker la dernière révision
        localStorage.setItem('lastReview', JSON.stringify(reviewData));
        
        // La soumission normale continue
        return true;
      });
    }
  });