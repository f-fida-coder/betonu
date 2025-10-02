// Script to test icon display issues on deployed site
document.addEventListener('DOMContentLoaded', function() {
  // Create a debug display in the corner of the page
  const debugEl = document.createElement('div');
  debugEl.style.position = 'fixed';
  debugEl.style.bottom = '10px';
  debugEl.style.right = '10px';
  debugEl.style.zIndex = '9999';
  debugEl.style.background = 'rgba(0,0,0,0.8)';
  debugEl.style.color = '#fff';
  debugEl.style.padding = '10px';
  debugEl.style.borderRadius = '5px';
  debugEl.style.maxWidth = '300px';
  debugEl.style.fontSize = '12px';
  
  // Function to log debug messages
  function logDebug(message) {
    const logEntry = document.createElement('div');
    logEntry.textContent = message;
    logEntry.style.marginBottom = '5px';
    logEntry.style.borderBottom = '1px solid rgba(255,255,255,0.3)';
    debugEl.appendChild(logEntry);
    console.log(message);
  }
  
  // Toggle debug panel visibility with Ctrl+D
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'd') {
      e.preventDefault();
      debugEl.style.display = debugEl.style.display === 'none' ? 'block' : 'none';
    }
  });
  
  document.body.appendChild(debugEl);
  logDebug('Icon Debug Started: ' + new Date().toLocaleTimeString());
  
  // Check if Font Awesome is loaded
  const isFontAwesomeLoaded = (function() {
    // Try to detect Font Awesome by checking for a known icon
    const testIcon = document.createElement('i');
    testIcon.className = 'fa fa-home';
    testIcon.style.visibility = 'hidden';
    document.body.appendChild(testIcon);
    
    const result = window.getComputedStyle(testIcon).fontFamily.includes('FontAwesome') || 
                   window.getComputedStyle(testIcon).fontFamily.includes('Font Awesome');
    document.body.removeChild(testIcon);
    return result;
  })();
  
  logDebug('Font Awesome loaded: ' + isFontAwesomeLoaded);
  
  // Check for sidebar icons
  const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
  logDebug('Sidebar links found: ' + sidebarLinks.length);
  
  // Check each sidebar link for icon issues
  sidebarLinks.forEach((link, index) => {
    const icon = link.querySelector('i');
    if (icon) {
      const href = link.getAttribute('href') || 'unknown';
      const computedStyle = window.getComputedStyle(icon);
      const isVisible = computedStyle.display !== 'none' && 
                         computedStyle.visibility !== 'hidden' && 
                         parseFloat(computedStyle.opacity) > 0;
      
      logDebug(`Icon ${index+1} (${href}): ${isVisible ? 'VISIBLE' : 'HIDDEN'}`);
      
      // If icon is hidden, try to fix it
      if (!isVisible) {
        // Add inline SVG fallback
        const iconType = link.getAttribute('data-icon-type') || 'default';
        
        // Create an SVG element
        const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgEl.setAttribute('width', '18');
        svgEl.setAttribute('height', '18');
        svgEl.setAttribute('viewBox', '0 0 576 512');
        svgEl.style.marginRight = '10px';
        
        // Create path based on icon type
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let iconPath = '';
        let iconColor = '#ffffff';
        
        // Set different path and color based on icon type
        switch(iconType) {
          case 'home':
            iconPath = 'M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z';
            iconColor = '#ffd700';
            break;
          default:
            iconPath = 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z';
            iconColor = '#9370db';
        }
        
        path.setAttribute('d', iconPath);
        path.setAttribute('fill', iconColor);
        svgEl.appendChild(path);
        
        // Replace the existing icon with the SVG
        icon.innerHTML = '';
        icon.appendChild(svgEl);
        icon.style.display = 'inline-flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        
        logDebug(`Fixed icon ${index+1} with SVG fallback`);
      }
    } else {
      logDebug(`Icon element missing for link ${index+1}`);
    }
  });
  
  // Load Font Awesome via alternative method if not loaded
  if (!isFontAwesomeLoaded) {
    logDebug('Attempting to load Font Awesome via alternative method');
    
    // Try loading Font Awesome via JS
    const script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/a076d05399.js';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
    
    script.onload = () => logDebug('Alternative Font Awesome load successful');
    script.onerror = () => logDebug('Alternative Font Awesome load failed');
  }
  
  // Add button to toggle debug info
  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = 'Toggle Debug';
  toggleBtn.style.marginTop = '10px';
  toggleBtn.style.padding = '5px';
  toggleBtn.addEventListener('click', function() {
    const logEntries = debugEl.querySelectorAll('div');
    logEntries.forEach(entry => {
      entry.style.display = entry.style.display === 'none' ? 'block' : 'none';
    });
  });
  
  debugEl.appendChild(toggleBtn);
  logDebug('Debug initialization complete. Press Ctrl+D to toggle debug panel.');
});