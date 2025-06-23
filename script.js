// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initScrollToTop();
    initSmoothScrolling();
    initMobileMenu();
    initGalleryInteractions();
    initLoadingAnimation();
    initParallaxEffects();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove navbar background on scroll
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 25px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Highlight active nav link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger animation for service cards
                if (entry.target.classList.contains('services-grid')) {
                    const cards = entry.target.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }

                // Add stagger animation for gallery items
                if (entry.target.classList.contains('gallery-grid')) {
                    const items = entry.target.querySelectorAll('.gallery-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.section-header, .about-content, .services-grid, .gallery-grid, .contact-content, .service-card, .gallery-item'
    );

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Initialize service cards and gallery items as hidden
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
    });
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Gallery interactions
function initGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        // Add click effect
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });

        // Add touch support for mobile
        item.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });

        item.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 300);
        });
    });
}

// Loading animation
function initLoadingAnimation() {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loadingScreen);

    // Hide loading screen after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
}

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero, .about-image img, .contact-image img');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            if (element.closest('.hero')) {
                element.style.transform = `translateY(${rate}px)`;
            } else {
                const elementTop = element.closest('section').offsetTop;
                const elementHeight = element.closest('section').offsetHeight;
                const elementRate = (scrolled - elementTop + window.innerHeight) * 0.1;
                
                if (scrolled > elementTop - window.innerHeight && scrolled < elementTop + elementHeight) {
                    element.style.transform = `translateY(${elementRate}px)`;
                }
            }
        });
    });
}

// Contact information interactions
document.addEventListener('DOMContentLoaded', function() {
    const phoneNumbers = document.querySelectorAll('.contact-details p');
    
    phoneNumbers.forEach(phone => {
        if (phone.textContent.includes('+92')) {
            phone.style.cursor = 'pointer';
            phone.addEventListener('click', function() {
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Copy to clipboard
                navigator.clipboard.writeText(this.textContent).then(() => {
                    showToast('ফোন নম্বর কপি হয়েছে!');
                });
            });
        }
    });
});

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(-10px)';
    }, 100);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(10px)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Add CSS for ripple effect and touch interactions
const additionalStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .touch-active .gallery-overlay {
        transform: translateY(0) !important;
    }

    .nav-link.active {
        color: #ff6b6b !important;
    }

    .nav-link.active::after {
        width: 100% !important;
    }

    @media (max-width: 768px) {
        .nav-menu.active {
            animation: slideDown 0.3s ease forwards;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .hero-decoration {
            display: none;
        }

        .floating-icon {
            display: none;
        }
    }

    body.menu-open {
        overflow: hidden;
    }
`;

// Add the additional styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy functions
const throttledScrollHandler = throttle(() => {
    // Handle scroll-dependent animations here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://pixabay.com/get/g02a7408ca2b6523a9654e681ca3211e83ac667402f0c5da7280cdce78717c6c99dc430afbd152b1dcd530fe9b7385c7439cb552263e8a79ac0b1aa663205a7df_1280.jpg',
        'https://pixabay.com/get/gfe334ed2c324dd0d160bae360b976b618db531ec010984f630d45a0ba53286831b7a822a5750d24591e77331eb3c5b45b3b3e02a337a63447b4c86b35dff4947_1280.jpg',
        'https://pixabay.com/get/gbde50eaff64cdaa954bc816223ea2b6cd2adb9e05d7f9f62cc73a67005b4c84cd66d5905a73d8527c62db579ebae80600ca8b1185bcc8bdcc7532e579899ae92_1280.jpg'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
});

// Initialize all animations and interactions
console.log('আলী টেইলার্স ওয়েবসাইট সফলভাবে লোড হয়েছে! ✂️');
