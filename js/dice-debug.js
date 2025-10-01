// Debug script to help identify content display issues
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dice debug script loaded');
    
    // Check if content container exists
    const contentContainer = document.querySelector('.content-container');
    if (contentContainer) {
        console.log('Content container found', contentContainer);
        
        // Log its dimensions and visibility
        const style = window.getComputedStyle(contentContainer);
        console.log('Content container dimensions:', 
            style.width, style.height, 
            'Display:', style.display,
            'Visibility:', style.visibility,
            'Opacity:', style.opacity);
        
        // Force display if needed
        setTimeout(function() {
            contentContainer.style.display = 'block';
            contentContainer.style.opacity = '1';
            contentContainer.style.visibility = 'visible';
            console.log('Forced content container display');
        }, 500);
    } else {
        console.error('Content container not found');
    }
    
    // Inject a debug element to make sure content is rendering
    const debugElement = document.createElement('div');
    debugElement.style.position = 'fixed';
    debugElement.style.top = '10px';
    debugElement.style.right = '10px';
    debugElement.style.background = 'red';
    debugElement.style.color = 'white';
    debugElement.style.padding = '5px';
    debugElement.style.zIndex = '9999';
    debugElement.style.fontSize = '12px';
    debugElement.textContent = 'Debug: Content should be visible';
    document.body.appendChild(debugElement);
    
    // Hide debug element after 5 seconds
    setTimeout(function() {
        debugElement.style.display = 'none';
    }, 5000);
});