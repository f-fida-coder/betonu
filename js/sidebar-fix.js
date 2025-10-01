// Immediate execution script to prevent sidebar width issues
(function() {
  // Create and inject a style element with highest priority rules
  const styleEl = document.createElement('style');
  styleEl.id = 'sidebar-fix-style';
  styleEl.innerHTML = `
    /* High-priority rules to fix sidebar width only */    
    @media (min-width: 769px) {
      .sidebar {
        width: 202.5px !important;
        min-width: 202.5px !important;
        max-width: 202.5px !important;
        position: fixed !important;
        left: 0 !important;
      }
      
      .main-panel {
        margin-left: 202.5px !important;
        width: calc(100% - 202.5px) !important;
      }
    }
  `;
  
  // Insert at the beginning of head for maximum priority
  const head = document.head || document.getElementsByTagName('head')[0];
  if (head.firstChild) {
    head.insertBefore(styleEl, head.firstChild);
  } else {
    head.appendChild(styleEl);
  }
  
  // Function to force recalculation of layout
  const forceReflow = function() {
    document.body && document.body.offsetHeight;
  };
  
  // Setup observer to immediately reapply styles if they're removed
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.removedNodes) {
        for (let i = 0; i < mutation.removedNodes.length; i++) {
          const node = mutation.removedNodes[i];
          if (node.id === 'sidebar-fix-style') {
            // Our style was removed, add it back
            if (head.firstChild) {
              head.insertBefore(styleEl.cloneNode(true), head.firstChild);
            } else {
              head.appendChild(styleEl.cloneNode(true));
            }
            forceReflow();
            break;
          }
        }
      }
    });
  });
  
  // Start observing the head
  observer.observe(head, { childList: true });
  
  // Force reflow to apply styles immediately
  forceReflow();
  
  console.log("Sidebar width fix applied");
})();