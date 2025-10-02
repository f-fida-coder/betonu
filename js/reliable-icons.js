// Enhanced icon implementation for Netlify support
document.addEventListener('DOMContentLoaded', function() {
  // First ensure FontAwesome is loaded from multiple CDNs
  function addFontAwesomeCDN() {
    const cdnUrls = [
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
      'https://use.fontawesome.com/releases/v5.15.4/css/all.css',
      'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
    ];
    
    cdnUrls.forEach(url => {
      if (!document.querySelector(`link[href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });
  }
  
  // Add data attributes to links for SVG fallbacks
  function addIconAttributes() {
    const iconMap = {
      'index.htm': { type: 'home', icon: 'fas fa-home' },
      'casino/lobby.html': { type: 'globe', icon: 'fas fa-globe' },
      'roulette.html': { type: 'refresh', icon: 'fas fa-sync-alt' },
      'crash.html': { type: 'trophy', icon: 'fas fa-trophy' },
      'coinflip.html': { type: 'dollar', icon: 'fas fa-dollar-sign' },
      'dice.html': { type: 'cube', icon: 'fas fa-dice' },
      'unboxing.html': { type: 'box', icon: 'fas fa-box' },
      'rewards.html': { type: 'star', icon: 'fas fa-star' },
      'deposit.html': { type: 'money', icon: 'fas fa-money-bill-wave' },
      'leaderboard.html': { type: 'trophy', icon: 'fas fa-trophy' },
      'faq.html': { type: 'tag', icon: 'fas fa-tags' }
    };
    
    Object.entries(iconMap).forEach(([href, data]) => {
      const link = document.querySelector(`.sidebar-nav a[href="${href}"]`);
      if (link) {
        link.setAttribute('data-icon-type', data.type);
        const icon = link.querySelector('i');
        if (icon) {
          icon.className = data.icon;
          // Ensure visibility with inline styles
          icon.style.cssText = 'display: inline-block !important; visibility: visible !important; opacity: 1 !important;';
        }
      }
    });
  }
  
  // Inject inline SVG icons if no icon is visible
  function injectInlineSVGs() {
    // Check each link after a delay to see if icons are visible
    setTimeout(() => {
      document.querySelectorAll('.sidebar-nav a[data-icon-type] i').forEach(icon => {
        // Check if the icon is not properly displayed
        if (getComputedStyle(icon).opacity === '0' || getComputedStyle(icon).display === 'none') {
          // Get the icon type from the parent link
          const iconType = icon.parentElement.getAttribute('data-icon-type');
          // Create SVG directly in the page
          const svgWrapper = document.createElement('span');
          svgWrapper.className = 'inline-svg-icon';
          svgWrapper.style.cssText = 'display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; margin-right: 10px;';
          
          // Replace icon with the new wrapper
          icon.parentElement.insertBefore(svgWrapper, icon);
          icon.parentElement.removeChild(icon);
          
          // Load the appropriate SVG based on icon type
          switch(iconType) {
            case 'home':
              svgWrapper.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="width: 18px; height: 18px;"><path fill="#ffd700" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"></path></svg>';
              break;
            case 'globe':
              svgWrapper.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" style="width: 18px; height: 18px;"><path fill="#ff7f50" d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"></path></svg>';
              break;
            // Add other icon SVGs as needed for each type
            default:
              svgWrapper.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 18px; height: 18px;"><path fill="#9370db" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"></path></svg>';
          }
        }
      });
    }, 1000); // Check after 1 second to allow CSS to load
  }

  // Execute all functions
  addFontAwesomeCDN();
  addIconAttributes();
  injectInlineSVGs();
});