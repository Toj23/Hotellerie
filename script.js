document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentSlide = 0;
    let slideInterval;
    const slideDelay = 6000; // 6 secondes entre chaque slide

    // Créer les points de navigation
    if (dotsContainer && slides.length > 0) {
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
    }

    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        if (slides.length === 0) return;
        // Retirer la classe active du slide et du point actuels
        slides[currentSlide].classList.remove('active');
        if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

        // Mettre à jour l'index du slide actuel
        currentSlide = index;

        // Ajouter la classe active au nouveau slide et point
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
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
        if (slides.length > 0) {
            slideInterval = setInterval(nextSlide, slideDelay);
        }
    }

    // Événements pour les boutons de navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            prevSlide();
            startSlideInterval();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            nextSlide();
            startSlideInterval();
        });
    }

    // Pause au survol
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', startSlideInterval);
    }

    // Démarrer le slider automatique
    startSlideInterval();

    // Gestion des dates dans le formulaire
    const arrivalInput = document.getElementById('arrival');
    const departureInput = document.getElementById('departure');

    if (arrivalInput && departureInput) {
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
    }

    // Gestion du formulaire de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    const contactBtn = document.querySelector('.contact-btn');

    // Gestion du formulaire de newsletter
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
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
        contactBtn.addEventListener('click', function () {
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
        icon.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) rotate(5deg)';
        });

        icon.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    // Validation de l'email en temps réel
    const emailInput = document.querySelector('.newsletter-form input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('input', function () {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailRegex.test(email)) {
                this.style.borderColor = '#4CAF50';
            } else {
                this.style.borderColor = email ? '#ff4444' : '#333';
            }
        });
    }

    // Gestion du formulaire d'événements
    const eventForm = document.querySelector('.event-form');
    if (eventForm) {
        // Définir la date minimale pour le champ de date
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
        }

        eventForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Récupérer les valeurs du formulaire
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                eventType: document.getElementById('event-type').value,
                date: document.getElementById('date').value,
                guests: document.getElementById('guests').value,
                message: document.getElementById('message').value
            };

            // Animation du bouton de soumission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            submitBtn.innerHTML = '<i class="fas fa-check"></i> Demande envoyée !';
            submitBtn.style.background = '#4CAF50';
            submitBtn.style.borderColor = '#4CAF50';
            submitBtn.disabled = true;

            // Simuler l'envoi (ici vous ajouteriez votre logique d'envoi réel)
            console.log('Demande d\'événement:', formData);

            // Réinitialiser après 3 secondes
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
                submitBtn.disabled = false;
                this.reset();

                // Scroll vers le haut de la page
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 3000);
        });

        // Validation en temps réel pour l'email du formulaire d'événements
        const eventEmailInput = document.getElementById('email');
        if (eventEmailInput) {
            eventEmailInput.addEventListener('input', function () {
                const email = this.value;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (emailRegex.test(email)) {
                    this.style.borderColor = '#4CAF50';
                } else {
                    this.style.borderColor = email ? '#ff4444' : '#e0e0e0';
                }
            });
        }

        // Validation pour le numéro de téléphone
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function () {
                const phone = this.value;
                const phoneRegex = /^[\d\s\+\-\(\)]+$/;

                if (phoneRegex.test(phone) && phone.length >= 10) {
                    this.style.borderColor = '#4CAF50';
                } else {
                    this.style.borderColor = phone ? '#ff4444' : '#e0e0e0';
                }
            });
        }
    }

    // Animation des cartes d'événements au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les cartes d'événements
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observer les témoignages
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 