document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optional: Add intersection observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Tech Articles Modal Logic
    const techBtn = document.getElementById('tech-articles-btn');
    const techModal = document.getElementById('tech-modal');
    const closeModal = document.querySelector('.close-modal');

    // Open Modal
    techBtn.addEventListener('click', (e) => {
        e.preventDefault();
        techModal.style.display = 'flex';
        // Small timeout to allow display:flex to apply before adding show class for transition
        setTimeout(() => {
            techModal.classList.add('show');
        }, 10);
    });

    // Close Modal Function
    const closeTechModal = () => {
        techModal.classList.remove('show');
        setTimeout(() => {
            techModal.style.display = 'none';
        }, 300); // Wait for transition
    };

    // Close on X click
    closeModal.addEventListener('click', closeTechModal);

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === techModal) {
            closeTechModal();
        }
    });

    // Initial fade-in setup
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
});
