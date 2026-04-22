// ============ Main JavaScript ============

// Binary Rain Background
function createBinaryRain() {
    const container = document.getElementById('binaryRain');
    if (!container) return;
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const digit = document.createElement('div');
        digit.className = 'binary-digit';
        digit.style.left = (i * 20) + 'px';
        digit.style.animationDuration = (Math.random() * 5 + 5) + 's';
        digit.style.animationDelay = (Math.random() * 5) + 's';
        digit.textContent = Math.random() > 0.5 ? '1' : '0';
        container.appendChild(digit);
        
        // Change value periodically
        setInterval(() => {
            digit.textContent = Math.random() > 0.5 ? '1' : '0';
        }, 2000 + Math.random() * 3000);
    }
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

// Back to top button
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Animated counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const options = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                let current = 0;
                const duration = 1500;
                const step = target / (duration / 16);
                
                const update = () => {
                    current += step;
                    if (current < target) {
                        el.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(update);
                    } else {
                        el.textContent = target + '+';
                    }
                };
                update();
                observer.unobserve(el);
            }
        });
    }, options);
    
    counters.forEach(c => observer.observe(c));
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    createBinaryRain();
    initNavbar();
    initBackToTop();
    animateCounters();
});
