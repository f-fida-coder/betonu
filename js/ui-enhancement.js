/**
 * MetBet UI Enhancement Script
 * This script adds visual enhancements without changing core functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add hover effects to buttons
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add transition effect for navigation items
    document.querySelectorAll('.navigation a').forEach(navItem => {
        navItem.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--primary)';
            this.style.color = 'white';
        });
        
        navItem.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = '';
                this.style.color = '';
            }
        });
    });
    
    // Add pulse effect to promotional elements
    document.querySelectorAll('.promo, .bonus-item').forEach(promo => {
        promo.classList.add('pulse');
    });
    
    // Enhance modals with fade-in effect
    const enhanceModals = () => {
        document.querySelectorAll('.modal').forEach(modal => {
            if (modal.style.display === 'flex' || modal.style.display === 'block') {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.style.opacity = '1';
                }, 10);
            }
        });
    };
    
    // Call once on page load
    enhanceModals();
    
    // Periodically check for new modals (in case they're dynamically added)
    setInterval(enhanceModals, 1000);
    
    // Add loading spinners to buttons when clicked
    document.querySelectorAll('button[type="submit"]').forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fa fa-spinner fa-spin"></i> ' + originalText;
            
            // Reset after 2 seconds if not otherwise changed
            setTimeout(() => {
                if (this.innerHTML.includes('fa-spinner')) {
                    this.innerHTML = originalText;
                }
            }, 2000);
        });
    });
    
    // Add smooth transitions to tabs
    document.querySelectorAll('.tab, .switch_panel').forEach(tab => {
        tab.addEventListener('click', function() {
            const siblings = Array.from(this.parentElement.children);
            siblings.forEach(sibling => {
                sibling.classList.remove('active');
                sibling.style.transition = 'all 0.3s ease';
            });
            
            this.classList.add('active');
        });
    });
    
    // Add parallax effect to carousel images
    document.querySelectorAll('.carousel .image img').forEach(img => {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const rect = img.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const shift = (rect.top - window.innerHeight/2) / 10;
                img.style.transform = `translateY(${shift}px)`;
            }
        });
    });
    
    // Add hover effect for game cards
    document.querySelectorAll('.game-card, .item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});