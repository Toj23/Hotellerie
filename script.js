document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDelay = 6000; // 6 secondes entre chaque slide
    
    // Créer les points de navigation
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(index);
            startSlideInterval();
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function goToSlide(index) {
        // Retirer la classe active du slide et du point actuels
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Mettre à jour l'index du slide actuel
        currentSlide = index;
        
        // Ajouter la classe active au nouveau slide et point
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }
    
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, slideDelay);
    }
    
    // Événements pour les boutons de navigation
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        startSlideInterval();
    });
    
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        startSlideInterval();
    });
    
    // Pause au survol
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startSlideInterval);
    
    // Démarrer le slider automatique
    startSlideInterval();
    
    // Gestion des dates dans le formulaire
    const arrivalInput = document.getElementById('arrival');
    const departureInput = document.getElementById('departure');
    
    // Définir la date minimale (aujourd'hui)
    const today = new Date().toISOString().split('T')[0];
    arrivalInput.min = today;
    
    // Mettre à jour la date minimale de départ quand la date d'arrivée change
    arrivalInput.addEventListener('change', () => {
        departureInput.min = arrivalInput.value;
        if (departureInput.value && departureInput.value < arrivalInput.value) {
            departureInput.value = arrivalInput.value;
        }
    });

    // Gestion du formulaire de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    const contactBtn = document.querySelector('.contact-btn');

    // Gestion du formulaire de newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Animation de succès
            const btn = this.querySelector('.btn');
            const originalText = btn.textContent;
            
            btn.innerHTML = '<i class="fas fa-check"></i> Inscrit !';
            btn.style.background = '#4CAF50';
            
            // Réinitialiser après 2 secondes
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                this.reset();
            }, 2000);

            // Ici, vous pouvez ajouter le code pour envoyer l'email à votre serveur
            console.log('Email inscrit:', email);
        });
    }

    // Gestion du bouton de contact
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            // Animation du bouton
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);

            // Ici, vous pouvez ajouter le code pour ouvrir un modal de contact
            // ou rediriger vers une page de contact
            console.log('Bouton contact cliqué');
        });
    }

    // Animation des icônes sociales au survol
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) rotate(5deg)';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Validation de l'email en temps réel
    const emailInput = document.querySelector('.newsletter-form input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailRegex.test(email)) {
                this.style.borderColor = '#4CAF50';
            } else {
                this.style.borderColor = email ? '#ff4444' : '#333';
            }
        });
    }
}); 