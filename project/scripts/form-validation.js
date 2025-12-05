// Form Validation Script
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    const formMessage = document.getElementById('formMessage');
    
    // Update dates in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;
    
    // Navigation hamburger
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Validation functions
    function validateName(name) {
        const regex = /^[A-Za-zÀ-ÿ\s]{2,50}$/;
        return regex.test(name.trim());
    }
    
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email.trim());
    }
    
    function validateSubject(subject) {
        return subject !== '';
    }
    
    function validateMessage(message) {
        return message.trim().length >= 10;
    }
    
    // Real-time validation
    nameInput.addEventListener('blur', () => {
        const errorElement = document.getElementById('nameError');
        if (!validateName(nameInput.value)) {
            errorElement.textContent = 'Veuillez entrer un nom valide (2-50 caractères)';
            nameInput.style.borderColor = 'var(--secondary-red)';
        } else {
            errorElement.textContent = '';
            nameInput.style.borderColor = 'var(--gray-border)';
        }
    });
    
    emailInput.addEventListener('blur', () => {
        const errorElement = document.getElementById('emailError');
        if (!validateEmail(emailInput.value)) {
            errorElement.textContent = 'Veuillez entrer une adresse email valide';
            emailInput.style.borderColor = 'var(--secondary-red)';
        } else {
            errorElement.textContent = '';
            emailInput.style.borderColor = 'var(--gray-border)';
        }
    });
    
    subjectSelect.addEventListener('change', () => {
        const errorElement = document.getElementById('subjectError');
        if (!validateSubject(subjectSelect.value)) {
            errorElement.textContent = 'Veuillez sélectionner un sujet';
            subjectSelect.style.borderColor = 'var(--secondary-red)';
        } else {
            errorElement.textContent = '';
            subjectSelect.style.borderColor = 'var(--gray-border)';
        }
    });
    
    messageTextarea.addEventListener('blur', () => {
        const errorElement = document.getElementById('messageError');
        if (!validateMessage(messageTextarea.value)) {
            errorElement.textContent = 'Le message doit contenir au moins 10 caractères';
            messageTextarea.style.borderColor = 'var(--secondary-red)';
        } else {
            errorElement.textContent = '';
            messageTextarea.style.borderColor = 'var(--gray-border)';
        }
    });
    
    // Form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Clear previous messages
        formMessage.className = 'form-message';
        formMessage.textContent = '';
        
        // Validate all fields
        const isNameValid = validateName(nameInput.value);
        const isEmailValid = validateEmail(emailInput.value);
        const isSubjectValid = validateSubject(subjectSelect.value);
        const isMessageValid = validateMessage(messageTextarea.value);
        
        if (!isNameValid) {
            document.getElementById('nameError').textContent = 'Veuillez entrer un nom valide';
            nameInput.style.borderColor = 'var(--secondary-red)';
        }
        
        if (!isEmailValid) {
            document.getElementById('emailError').textContent = 'Veuillez entrer une adresse email valide';
            emailInput.style.borderColor = 'var(--secondary-red)';
        }
        
        if (!isSubjectValid) {
            document.getElementById('subjectError').textContent = 'Veuillez sélectionner un sujet';
            subjectSelect.style.borderColor = 'var(--secondary-red)';
        }
        
        if (!isMessageValid) {
            document.getElementById('messageError').textContent = 'Le message doit contenir au moins 10 caractères';
            messageTextarea.style.borderColor = 'var(--secondary-red)';
        }
        
        // If all valid, process form
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Create form data object
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectSelect.value,
                message: messageTextarea.value.trim(),
                newsletter: document.getElementById('newsletter').checked,
                timestamp: new Date().toISOString()
            };
            
            // Save to localStorage
            saveFormData(formData);
            
            // Show success message
            formMessage.textContent = 'Merci! Votre message a été envoyé avec succès.';
            formMessage.classList.add('success');
            
            // Reset form
            form.reset();
            
            // Clear error styles
            [nameInput, emailInput, subjectSelect, messageTextarea].forEach(input => {
                input.style.borderColor = 'var(--gray-border)';
            });
            
            // Clear error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
        } else {
            formMessage.textContent = 'Veuillez corriger les erreurs dans le formulaire.';
            formMessage.classList.add('error');
        }
    });
    
    // Save form data to localStorage
    function saveFormData(formData) {
        // Get existing submissions or create empty array
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        
        // Add new submission
        submissions.push(formData);
        
        // Keep only last 10 submissions
        if (submissions.length > 10) {
            submissions.shift();
        }
        
        // Save back to localStorage
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        
        // Log to console for demonstration
        console.log('Form data saved:', formData);
        console.log('Total submissions:', submissions.length);
    }
    
    // Load and display submission count
    function displaySubmissionCount() {
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        const countElement = document.createElement('p');
        countElement.className = 'submission-count';
        countElement.textContent = `Nombre de messages envoyés: ${submissions.length}`;
        
        const form = document.querySelector('.contact-form');
        if (form && submissions.length > 0) {
            form.appendChild(countElement);
        }
    }
    
    // Initialize
    displaySubmissionCount();
});