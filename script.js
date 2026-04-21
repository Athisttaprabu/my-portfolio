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

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === techModal) {
            closeTechModal();
        }
        if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });

    // Initial fade-in setup
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Robust Copy to Clipboard logic
    const copyToClipboard = (text, btn) => {
        const originalContent = btn.innerHTML;

        const setStatus = (success) => {
            btn.innerHTML = success ? '<i class="fas fa-check"></i> Copied!' : '<i class="fas fa-times"></i> Failed';
            if (success) btn.classList.add('copied');
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.classList.remove('copied');
            }, 2000);
        };

        const fallbackCopy = (str) => {
            const textArea = document.createElement("textarea");
            textArea.value = str;
            textArea.style.position = "fixed";
            textArea.style.left = "-9999px";
            textArea.style.top = "0";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                const successful = document.execCommand('copy');
                textArea.remove();
                setStatus(successful);
            } catch (err) {
                console.error('Fallback copy failed:', err);
                textArea.remove();
                setStatus(false);
            }
        };

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text)
                .then(() => setStatus(true))
                .catch(err => {
                    console.warn('Clipboard API failed, trying fallback:', err);
                    fallbackCopy(text);
                });
        } else {
            fallbackCopy(text);
        }
    };

    // Global listener for copy buttons
    document.addEventListener('click', (e) => {
        const copyBtn = e.target.closest('.copy-btn');
        if (copyBtn) {
            e.preventDefault();
            const container = copyBtn.closest('.code-container');
            const codeElement = container.querySelector('code');
            if (codeElement) {
                // Use textContent for a cleaner text extraction from pre/code blocks
                copyToClipboard(codeElement.textContent, copyBtn);
            }
        }
    });
});
