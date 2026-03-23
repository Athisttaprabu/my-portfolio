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

    // Copy to Clipboard logic with fallback for non-secure environments
    const copyToClipboard = (text, btn) => {
        const copyAction = (str) => {
            if (navigator.clipboard && window.isSecureContext) {
                return navigator.clipboard.writeText(str);
            } else {
                // Fallback method for non-HTTPS or file:// protocol
                return new Promise((resolve, reject) => {
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
                        successful ? resolve() : reject();
                    } catch (err) {
                        textArea.remove();
                        reject(err);
                    }
                });
            }
        };

        copyAction(text).then(() => {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            btn.classList.add('copied');

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            btn.innerHTML = '<i class="fas fa-times"></i> Error';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            }, 2000);
        });
    };

    // Global listener for copy buttons
    document.addEventListener('click', (e) => {
        const copyBtn = e.target.closest('.copy-btn');
        if (copyBtn) {
            const container = copyBtn.closest('.code-container');
            const codeElement = container.querySelector('code');
            copyToClipboard(codeElement.innerText, copyBtn);
        }
    });
});
