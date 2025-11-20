// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (currentPage === 'index.html' && (href === 'index.html' || href === '#')) {
            link.classList.add('active');
        } else if (currentPage === 'details.html' && href === 'details.html') {
            link.classList.add('active');
        } else if (currentPage === 'resources.html' && href === 'resources.html') {
            link.classList.add('active');
        } else if (currentPage === 'services.html' && href === 'services.html') {
            link.classList.add('active');
        } else if (currentPage === 'author.html' && href === 'author.html') {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Set active nav link
    setActiveNavLink();
    
    // Navigation links - handle both page navigation and smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navMenu = document.getElementById('nav-menu');
                    if (navMenu) {
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    if (window.AOS) {
        AOS.init({
            once: true,
            duration: 700,
            offset: 80,
            easing: 'ease-out',
            disable: function() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
        });
    }
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

