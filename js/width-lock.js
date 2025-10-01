// Script to lock sidebar width and prevent unwanted gap adjustments
(function() {
  // Execute immediately and then again after DOM is loaded
  const lockSidebarWidth = function() {
    console.log("Locking sidebar width...");
    
    // Add style for width only
    const style = document.createElement('style');
    style.textContent = `
      .sidebar {
        width: 202.5px !important;
        min-width: 202.5px !important;
        max-width: 202.5px !important;
        left: 0 !important;
        position: fixed !important;
      }
      .main-panel {
        margin-left: 202.5px !important;
        width: calc(100% - 202.5px) !important;
      }
      @media (max-width: 768px) {
        .sidebar {
          width: 100% !important;
        }
        .main-panel {
          margin-left: 0 !important;
          width: 100% !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Function to enforce sidebar width
    const enforceWidth = function() {
      // Get the sidebar and main panel elements
      const sidebar = document.querySelector('.sidebar');
      const mainPanel = document.querySelector('.main-panel');
      
      if (!sidebar || !mainPanel) return;
      
      // Force width with inline styles (highest specificity)
      if (window.innerWidth >= 769) {
        sidebar.style.width = '202.5px';
        sidebar.style.minWidth = '202.5px';
        sidebar.style.maxWidth = '202.5px';
        
        if (!sidebar.classList.contains('hidden')) {
          mainPanel.style.marginLeft = '202.5px';
          mainPanel.style.width = 'calc(100% - 202.5px)';
        }
      } else {
        // Mobile view
        sidebar.style.width = '100%';
        mainPanel.style.marginLeft = '0';
        mainPanel.style.width = '100%';
      }
    };
    
    // Apply immediately
    enforceWidth();
    
    // Apply again after a short delay
    setTimeout(enforceWidth, 100);
    setTimeout(enforceWidth, 500);
    
    // Monitor for any style changes
    const observer = new MutationObserver(function() {
      enforceWidth();
    });
    
    // Observe the sidebar and main panel
    const sidebar = document.querySelector('.sidebar');
    const mainPanel = document.querySelector('.main-panel');
    
    if (sidebar) {
      observer.observe(sidebar, { 
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    }
    
    if (mainPanel) {
      observer.observe(mainPanel, { 
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    }
    
    // Force recalculation of layout
    document.body.offsetHeight;
  };

  // Run immediately  
  lockSidebarWidth();
  
  // Also run when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lockSidebarWidth);
  }
  
  // And when page is fully loaded
  window.addEventListener('load', lockSidebarWidth);
})();