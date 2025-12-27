// Initialisation des effets Liquid Glass
document.addEventListener('DOMContentLoaded', function() {
  // Effets sur les boutons
  initLiquidButtons();
  
  // Effets sur les cartes
  initLiquidCards();
  
  // Contrôles interactifs
  initControls();
  
  // Effet sur l'objet liquid
  initLiquidObject();
  
  // Modale newsletter
  initModal();
  
  // Menu mobile
  initMobileMenu();
  
  // Effet de vague sur les titres
  initWaveEffect();
  
  // Effet de distorsion sur le fond
  initBackgroundEffect();
});

// Effets sur les boutons
function initLiquidButtons() {
  const buttons = document.querySelectorAll('.liquid-btn');
  
  buttons.forEach(button => {
      // Effet au clic
      button.addEventListener('click', function(e) {
          // Créer un effet de goutte
          createRippleEffect(e, this);
          
          // Effet sonore (optionnel)
          playClickSound();
      });
      
      // Effet au survol
      button.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-5px) scale(1.05)';
          this.style.boxShadow = '0 15px 35px rgba(64, 156, 255, 0.4)';
      });
      
      button.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0) scale(1)';
          this.style.boxShadow = '0 8px 32px var(--glass-shadow)';
      });
  });
}

// Effet de goutte (ripple) sur les boutons
function createRippleEffect(event, element) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');
  
  element.appendChild(ripple);
  
  // Supprimer l'élément après l'animation
  setTimeout(() => {
      ripple.remove();
  }, 600);
}

// Effets sur les cartes
function initLiquidCards() {
  const cards = document.querySelectorAll('.liquid-card');
  
  cards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Effet de profondeur
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateY = (x - centerX) / 25;
          const rotateX = (centerY - y) / 25;
          
          this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
          
          // Effet de brillance
          const shine = document.createElement('div');
          shine.style.position = 'absolute';
          shine.style.top = y + 'px';
          shine.style.left = x + 'px';
          shine.style.width = '100px';
          shine.style.height = '100px';
          shine.style.background = 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)';
          shine.style.borderRadius = '50%';
          shine.style.pointerEvents = 'none';
          shine.style.transform = 'translate(-50%, -50%)';
          
          // Supprimer les anciens effets de brillance
          const oldShine = this.querySelector('.shine-effect');
          if (oldShine) oldShine.remove();
          
          shine.classList.add('shine-effect');
          this.appendChild(shine);
          
          // Supprimer l'effet de brillance après un moment
          setTimeout(() => {
              if (shine.parentNode === this) {
                  shine.style.opacity = '0';
                  shine.style.transition = 'opacity 0.5s ease';
                  setTimeout(() => {
                      if (shine.parentNode === this) shine.remove();
                  }, 500);
              }
          }, 300);
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
          
          // Supprimer l'effet de brillance
          const shine = this.querySelector('.shine-effect');
          if (shine) {
              shine.style.opacity = '0';
              setTimeout(() => {
                  if (shine.parentNode === this) shine.remove();
              }, 500);
          }
      });
  });
}

// Contrôles interactifs
function initControls() {
  const viscositySlider = document.getElementById('viscosity');
  const reflectionSlider = document.getElementById('reflection');
  const opacitySlider = document.getElementById('opacity');
  const viscosityValue = document.getElementById('viscosity-value');
  const reflectionValue = document.getElementById('reflection-value');
  const opacityValue = document.getElementById('opacity-value');
  const resetBtn = document.getElementById('reset-btn');
  const randomBtn = document.getElementById('random-btn');
  const liquidObject = document.getElementById('liquid-object');
  
  // Mettre à jour les valeurs affichées
  viscositySlider.addEventListener('input', function() {
      viscosityValue.textContent = this.value + '%';
      updateLiquidObject();
  });
  
  reflectionSlider.addEventListener('input', function() {
      reflectionValue.textContent = this.value + '%';
      updateLiquidObject();
  });
  
  opacitySlider.addEventListener('input', function() {
      opacityValue.textContent = this.value + '%';
      updateLiquidObject();
  });
  
  // Réinitialiser les valeurs
  resetBtn.addEventListener('click', function() {
      viscositySlider.value = 50;
      reflectionSlider.value = 75;
      opacitySlider.value = 85;
      
      viscosityValue.textContent = '50%';
      reflectionValue.textContent = '75%';
      opacityValue.textContent = '85%';
      
      updateLiquidObject();
      createRippleEffect({clientX: this.getBoundingClientRect().left + 10, clientY: this.getBoundingClientRect().top + 10}, this);
  });
  
  // Valeurs aléatoires
  randomBtn.addEventListener('click', function() {
      viscositySlider.value = Math.floor(Math.random() * 100) + 1;
      reflectionSlider.value = Math.floor(Math.random() * 100) + 1;
      opacitySlider.value = Math.floor(Math.random() * 100) + 1;
      
      viscosityValue.textContent = viscositySlider.value + '%';
      reflectionValue.textContent = reflectionSlider.value + '%';
      opacityValue.textContent = opacitySlider.value + '%';
      
      updateLiquidObject();
      createRippleEffect({clientX: this.getBoundingClientRect().left + 10, clientY: this.getBoundingClientRect().top + 10}, this);
  });
  
  // Mettre à jour l'objet liquid
  function updateLiquidObject() {
      const viscosity = viscositySlider.value;
      const reflection = reflectionSlider.value;
      const opacity = opacitySlider.value;
      
      // Appliquer les propriétés à l'objet
      liquidObject.style.backdropFilter = `blur(${viscosity / 10}px)`;
      liquidObject.style.boxShadow = `
          0 20px 60px rgba(0, 0, 0, 0.3),
          inset 0 0 ${reflection / 5}px rgba(255, 255, 255, ${reflection / 200}),
          0 0 ${reflection}px rgba(64, 156, 255, ${reflection / 200})
      `;
      liquidObject.style.background = `rgba(255, 255, 255, ${opacity / 200})`;
      
      // Animation de tremblement léger pour indiquer le changement
      liquidObject.style.animation = 'none';
      setTimeout(() => {
          liquidObject.style.animation = '';
      }, 10);
  }
}

// Effet sur l'objet liquid
function initLiquidObject() {
  const liquidObject = document.getElementById('liquid-object');
  
  liquidObject.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Effet de distorsion liquide
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      // Appliquer la distorsion
      this.style.borderRadius = `
          ${30 + deltaY * 10}px 
          ${30 - deltaX * 10}px 
          ${30 - deltaY * 10}px 
          ${30 + deltaX * 10}px
      `;
      
      // Effet de vague interne
      const innerElement = this.querySelector('.liquid-inner');
      if (innerElement) {
          innerElement.style.transform = `
              translate(${deltaX * 5}px, ${deltaY * 5}px)
          `;
      }
  });
  
  liquidObject.addEventListener('mouseleave', function() {
      // Rétablir la forme originale
      this.style.borderRadius = '30px';
      
      const innerElement = this.querySelector('.liquid-inner');
      if (innerElement) {
          innerElement.style.transform = 'translate(0, 0)';
      }
  });
}

// Modale newsletter
function initModal() {
  const newsletterBtn = document.getElementById('newsletter-btn');
  const modalOverlay = document.getElementById('modal-overlay');
  const closeModal = document.querySelector('.close-modal');
  
  if (newsletterBtn && modalOverlay) {
      newsletterBtn.addEventListener('click', function() {
          modalOverlay.classList.add('active');
          document.body.style.overflow = 'hidden';
      });
      
      closeModal.addEventListener('click', function() {
          modalOverlay.classList.remove('active');
          document.body.style.overflow = 'auto';
      });
      
      modalOverlay.addEventListener('click', function(e) {
          if (e.target === modalOverlay) {
              modalOverlay.classList.remove('active');
              document.body.style.overflow = 'auto';
          }
      });
  }
}

// Menu mobile
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', function() {
          navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
          
          if (navLinks.style.display === 'flex') {
              navLinks.style.position = 'absolute';
              navLinks.style.top = '100%';
              navLinks.style.left = '0';
              navLinks.style.width = '100%';
              navLinks.style.flexDirection = 'column';
              navLinks.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
              navLinks.style.backdropFilter = 'blur(10px)';
              navLinks.style.padding = '2rem';
              navLinks.style.gap = '1.5rem';
              navLinks.style.borderTop = '1px solid var(--glass-border)';
              navLinks.style.zIndex = '100';
          }
      });
      
      // Fermer le menu en cliquant sur un lien
      document.querySelectorAll('.nav-link').forEach(link => {
          link.addEventListener('click', function() {
              if (window.innerWidth <= 768) {
                  navLinks.style.display = 'none';
              }
          });
      });
      
      // Adapter le menu en redimensionnant la fenêtre
      window.addEventListener('resize', function() {
          if (window.innerWidth > 768) {
              navLinks.style.display = 'flex';
              navLinks.style.position = 'static';
              navLinks.style.flexDirection = 'row';
              navLinks.style.backgroundColor = 'transparent';
              navLinks.style.padding = '0';
              navLinks.style.borderTop = 'none';
          } else {
              navLinks.style.display = 'none';
          }
      });
  }
}

// Effet de vague sur les titres
function initWaveEffect() {
  const titles = document.querySelectorAll('.liquid-title, .section-title');
  
  titles.forEach(title => {
      // Séparer le texte en lettres pour l'animation
      const text = title.textContent;
      title.innerHTML = '';
      
      for (let i = 0; i < text.length; i++) {
          const span = document.createElement('span');
          span.textContent = text[i];
          span.style.display = 'inline-block';
          span.style.transition = 'transform 0.3s ease';
          title.appendChild(span);
      }
      
      // Effet au survol
      title.addEventListener('mouseenter', function() {
          const letters = this.querySelectorAll('span');
          letters.forEach((letter, index) => {
              setTimeout(() => {
                  letter.style.transform = 'translateY(-10px)';
                  
                  setTimeout(() => {
                      letter.style.transform = 'translateY(0)';
                  }, 300);
              }, index * 50);
          });
      });
  });
}

// Effet de distorsion sur le fond
function initBackgroundEffect() {
  const liquidBackground = document.querySelector('.liquid-background');
  
  if (liquidBackground) {
      // Créer des bulles liquides
      for (let i = 0; i < 15; i++) {
          createLiquidBubble(liquidBackground);
      }
  }
  
  function createLiquidBubble(container) {
      const bubble = document.createElement('div');
      bubble.classList.add('liquid-bubble');
      
      // Propriétés aléatoires
      const size = Math.random() * 100 + 50;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 30 + 20;
      const delay = Math.random() * 5;
      
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = posX + '%';
      bubble.style.top = posY + '%';
      bubble.style.background = `radial-gradient(circle, 
          rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.1) 0%, 
          transparent 70%)`;
      bubble.style.borderRadius = '50%';
      bubble.style.position = 'absolute';
      bubble.style.animation = `floatBubble ${duration}s ease-in-out ${delay}s infinite alternate`;
      
      container.appendChild(bubble);
  }
}

// Effet sonore (optionnel)
function playClickSound() {
  // Créer un son de clic simple
  try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
      // L'audio n'est pas supporté ou l'utilisateur l'a désactivé
      console.log("Audio non disponible");
  }
}

// Ajouter l'animation des bulles au CSS via JavaScript
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes floatBubble {
      0% {
          transform: translate(0, 0) scale(1);
          opacity: 0.5;
      }
      25% {
          transform: translate(20px, -30px) scale(1.1);
          opacity: 0.7;
      }
      50% {
          transform: translate(-15px, -50px) scale(0.9);
          opacity: 0.5;
      }
      75% {
          transform: translate(30px, -20px) scale(1.05);
          opacity: 0.6;
      }
      100% {
          transform: translate(-10px, 0) scale(1);
          opacity: 0.5;
      }
  }
  
  .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
  }
  
  @keyframes ripple-animation {
      to {
          transform: scale(4);
          opacity: 0;
      }
  }
`;
document.head.appendChild(styleSheet);