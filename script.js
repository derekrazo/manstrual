// Countdown Timer
function initCountdown() {
    // Set the deadline date (November 30th, 2025 at 11:59 PM EST)
    const deadline = new Date('2025-11-30T23:59:59-05:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = deadline - now;

        if (timeLeft < 0) {
            // If deadline has passed, reset to next month
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    }

    // Update countdown immediately and then every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);
}

// Form Submission Handler
function initFormHandler() {
    const form = document.getElementById('applicationForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Log form data (in production, this would send to your backend)
            console.log('Application submitted:', data);

            // Show success message
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.textContent = '✓ Application Submitted!';
            submitButton.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
            submitButton.disabled = true;

            // Show confirmation alert
            setTimeout(() => {
                alert('Thank you for your application! We\'ll be in touch within 24 hours to schedule your free strategy call.\n\nCheck your email (including spam folder) for confirmation and next steps.');

                // Reset form
                form.reset();
                submitButton.textContent = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 1000);
        });
    }
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.problem-card, .phase-card, .included-card, .testimonial-card, .faq-item');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Track CTA Clicks (for analytics)
function initCTATracking() {
    const ctaButtons = document.querySelectorAll('.cta-button');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ctaText = this.textContent.trim();
            console.log('CTA Clicked:', ctaText);

            // In production, send to analytics
            // gtag('event', 'cta_click', { cta_text: ctaText });
        });
    });
}

// Dynamic Urgency Updates
function initUrgencyUpdates() {
    const urgencyText = document.querySelector('.urgency-text');

    // Simulate decreasing spots (in production, this would come from your backend)
    const spots = [7, 6, 5, 4, 3];
    let currentIndex = 0;

    // Update spots remaining every 30 minutes (for demo purposes)
    setInterval(() => {
        if (currentIndex < spots.length - 1) {
            currentIndex++;
            const newSpots = spots[currentIndex];
            urgencyText.innerHTML = `<strong>December Cohort:</strong> Only ${newSpots} spots remaining`;
        }
    }, 1800000); // 30 minutes
}

// Add to Calendar Functionality (optional enhancement)
function addToCalendar() {
    // This would generate an .ics file for users to add the deadline to their calendar
    const event = {
        title: 'Manstrual December Cohort Deadline',
        start: new Date('2025-11-30T23:59:59'),
        duration: 1,
        description: 'Last day to apply for the December cohort of Manstrual'
    };

    console.log('Add to calendar:', event);
}

// FAQ Toggle (optional enhancement)
function initFAQToggle() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        // Initially show all answers (no toggle for this version)
        // If you want collapsible FAQs, uncomment below:

        /*
        answer.style.display = 'none';
        question.style.cursor = 'pointer';

        question.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';
            answer.style.display = isOpen ? 'none' : 'block';
            question.style.color = isOpen ? '#fff' : '#6366F1';
        });
        */
    });
}

// Video Player (if you add video later)
function initVideoPlayer() {
    const videoPlaceholder = document.querySelector('.video-placeholder');

    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // Load and play video
            console.log('Play video');
        });
    }
}

// Price Calculator (optional for payment plans)
function calculatePaymentPlan(totalPrice, numPayments) {
    const paymentAmount = Math.ceil(totalPrice / numPayments);
    return {
        numPayments,
        paymentAmount,
        total: paymentAmount * numPayments
    };
}

// Testimonial Carousel (optional enhancement)
function initTestimonialCarousel() {
    // If you want a rotating testimonial feature instead of grid
    const testimonials = document.querySelectorAll('.testimonial-card');

    if (testimonials.length > 0) {
        // Add carousel logic here if needed
        console.log(`${testimonials.length} testimonials loaded`);
    }
}

// Exit Intent Popup (optional - shows popup when user tries to leave)
function initExitIntent() {
    let exitIntentShown = false;

    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !exitIntentShown) {
            exitIntentShown = true;

            // Show exit intent popup
            const showPopup = confirm('Wait! Before you go...\n\nAre you sure you want to miss out on transforming your relationship?\n\nClick OK to stay and learn more, or Cancel to leave.');

            if (showPopup) {
                // Scroll to pricing or application section
                document.querySelector('#apply').scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// Social Proof Notifications (optional - shows recent signups)
function initSocialProof() {
    const names = [
        'Michael from Chicago',
        'David from Austin',
        'Ryan from Seattle',
        'Chris from Miami',
        'Jake from Denver',
        'James from Boston'
    ];

    function showNotification() {
        const name = names[Math.floor(Math.random() * names.length)];
        const notification = document.createElement('div');

        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
            z-index: 9999;
            font-size: 0.9rem;
            max-width: 300px;
            animation: slideIn 0.5s ease-out;
        `;

        notification.innerHTML = `
            <strong>🎉 ${name}</strong> just joined the December cohort
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 4000);
    }

    // Show first notification after 10 seconds, then every 45 seconds
    setTimeout(() => {
        showNotification();
        setInterval(showNotification, 45000);
    }, 10000);
}

// Add CSS for social proof animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initFormHandler();
    initSmoothScroll();
    initNavbarScroll();
    initScrollAnimations();
    initCTATracking();
    initFAQToggle();

    // Optional features (uncomment to enable)
    // initExitIntent();
    initSocialProof();

    console.log('🎉 Manstrual website loaded successfully!');
});

// Utility: Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(amount);
}

// Utility: Validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility: Validate phone
function isValidPhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}
