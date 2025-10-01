// Enhanced Sidebar Functionality
document.addEventListener("DOMContentLoaded", function() {
    // Set active link based on current page URL
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    sidebarLinks.forEach(link => {
        // Get the href attribute
        const href = link.getAttribute('href');
        
        // Check if the current path ends with the href 
        // (to handle both /index.htm and /)
        if (currentPath.endsWith(href) || 
            (href === 'index.htm' && (currentPath === '/' || currentPath.endsWith('/')))) {
            link.classList.add('active');
        }
    });
    
    // Add animation effects on hover for all links
    sidebarLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Trigger shine effect animation
            const before = this.querySelector('::before');
            if (before) {
                before.style.left = '-100%';
                setTimeout(() => {
                    before.style.left = '100%';
                }, 10);
            }
        });
    });
});