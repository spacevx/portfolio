document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const animateElements = document.querySelectorAll('.animate');
    
    let lastScrollTime = 0;
    function handleNavbarScroll() {
        const now = Date.now();
        if (now - lastScrollTime > 50) {
            lastScrollTime = now;
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
    }
    
    handleNavbarScroll();
    
    function scrollHandler() {
        handleNavbarScroll();
        requestAnimationFrame(scrollHandler);
    }
    requestAnimationFrame(scrollHandler);
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            
            if (navbarMenu.classList.contains('active')) {
                navbarToggle.innerHTML = '<i class="bi bi-x-lg"></i>';
                document.body.style.overflow = 'hidden';
            } else {
                navbarToggle.innerHTML = '<i class="bi bi-list"></i>';
                document.body.style.overflow = '';
            }
        });
        
        navbarMenu.addEventListener('click', function(e) {
            if (e.target.classList.contains('navbar-link')) {
                navbarMenu.classList.remove('active');
                navbarToggle.innerHTML = '<i class="bi bi-list"></i>';
                document.body.style.overflow = '';
            }
        });
    }
    
    if (animateElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-running');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
        
        requestAnimationFrame(() => {
            const visibleElements = Array.from(animateElements).filter(el => {
                const rect = el.getBoundingClientRect();
                return rect.top < window.innerHeight;
            });
            
            visibleElements.forEach(el => {
                el.classList.add('animate-running');
            });
        });
    } else {
        animateElements.forEach(element => {
            element.classList.add('animate-running');
        });
    }
    
    document.addEventListener('click', function(e) {
        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            const targetId = anchor.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        }
    });
});