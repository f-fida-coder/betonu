// JavaScript to handle sidebar and chat modal functionality

document.addEventListener('DOMContentLoaded', function() {
  // Handle sidebar toggle for mobile
  const toggles = document.querySelectorAll('[data-toggle="sidebar"]');
  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.querySelector('.sidebar-overlay');
  const mainPanel = document.querySelector('.main-panel');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      sidebar.classList.toggle('mobile-open');
      if (sidebarOverlay) {
        sidebarOverlay.classList.toggle('active');
      }
      
      // Ensure main panel adjusts properly on desktop view
      if (window.innerWidth >= 769) {
        if (sidebar.classList.contains('hidden')) {
          mainPanel.style.marginLeft = '0';
          mainPanel.style.width = '100%';
        } else {
          mainPanel.style.marginLeft = 'var(--sidebar-width)';
          mainPanel.style.width = 'calc(100% - var(--sidebar-width))';
        }
      }
    });
  });

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', function() {
      sidebar.classList.remove('mobile-open');
      sidebarOverlay.classList.remove('active');
    });
  }

  // Handle chat modal
  const chatToggleBtn = document.querySelector('.sidebar-chat-toggle');
  const floatingChatBtn = document.querySelector('.floating-chat-toggle');
  const modalChat = document.querySelector('#modal_chat');
  
  // Copy chat content from pullout to modal if needed
  const chatArea = document.querySelector('#chat-area');
  const chatModalMessages = document.querySelector('#chat-modal-messages');
  
  if (chatArea && chatModalMessages && chatModalMessages.innerHTML.trim() === '') {
    // Only populate if empty
    chatModalMessages.innerHTML = chatArea.innerHTML;
  }

  // Chat emoji handling for modal
  const chatEmojisPanel = document.querySelector('.emojis-panel');
  if (chatEmojisPanel) {
    const modalEmojisPanel = document.querySelector('.chat-modal-emojis');
    if (modalEmojisPanel) {
      modalEmojisPanel.innerHTML = chatEmojisPanel.innerHTML;
    }
  }
  
  // Fixed layout handler that respects the CSS width settings
  const applyFixedLayout = function() {
    if (window.innerWidth >= 769) {
      // Desktop view
      if (sidebar && mainPanel) {
        if (sidebar.classList.contains('hidden')) {
          mainPanel.style.marginLeft = '0';
          mainPanel.style.width = '100%';
        } else {
          // Use the exact width we specified in CSS
          const sidebarWidthValue = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-width').trim();
          mainPanel.style.marginLeft = sidebarWidthValue;
          mainPanel.style.width = `calc(100% - ${sidebarWidthValue})`;
        }
      }
    } else {
      // Mobile view
      if (mainPanel) {
        mainPanel.style.marginLeft = '0';
        mainPanel.style.width = '100%';
      }
    }
  };
  
  // Apply once at startup
  applyFixedLayout();
  
  // Maintain layout on resize, but maintain our width
  window.addEventListener('resize', applyFixedLayout);
});