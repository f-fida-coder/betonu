// Spin button functionality
document.addEventListener('DOMContentLoaded', function() {
    const spinButton = document.querySelector('.spin-button');
    
    if (spinButton) {
        // Add hover effect
        spinButton.addEventListener('mouseenter', function() {
            this.classList.remove('spin-button-animated');
        });
        
        spinButton.addEventListener('mouseleave', function() {
            this.classList.add('spin-button-animated');
        });
        
        // Add click effect
        spinButton.addEventListener('click', function(e) {
            // Create a ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    }
});