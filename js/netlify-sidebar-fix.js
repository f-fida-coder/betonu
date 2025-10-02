// Ensure proper FontAwesome icon loading and sidebar enhancement for Netlify
document.addEventListener('DOMContentLoaded', function() {
  // Add FontAwesome icons to menu items using JavaScript (more reliable than CSS)
  const addIconToNavLink = (selector, iconClass) => {
    const link = document.querySelector(selector);
    if (link) {
      const icon = link.querySelector('i');
      if (icon) {
        // First, set the class name
        icon.className = iconClass;
        
        // Then also add inline styles to ensure visibility
        icon.style.display = 'inline-block';
        icon.style.visibility = 'visible';
        icon.style.opacity = '1';
        icon.style.width = '28px';
        icon.style.height = '28px';
        icon.style.textAlign = 'center';
        icon.style.lineHeight = '28px';
        icon.style.fontSize = '18px';
      } else {
        // If no icon element exists, create one
        const newIcon = document.createElement('i');
        newIcon.className = iconClass;
        newIcon.style.display = 'inline-block';
        newIcon.style.visibility = 'visible';
        newIcon.style.opacity = '1';
        newIcon.style.width = '28px';
        newIcon.style.height = '28px';
        newIcon.style.textAlign = 'center';
        newIcon.style.lineHeight = '28px';
        newIcon.style.fontSize = '18px';
        
        // Insert at the beginning of the link
        if (link.firstChild) {
          link.insertBefore(newIcon, link.firstChild);
        } else {
          link.appendChild(newIcon);
        }
      }
    }
  };

  // Apply FontAwesome icons to all nav items with both class and fallback elements
  addIconToNavLink('.sidebar-nav a[href="index.htm"]', 'fa fa-home');
  addIconToNavLink('.sidebar-nav a[href="casino/lobby.html"]', 'fa fa-globe');
  addIconToNavLink('.sidebar-nav a[href="roulette.html"]', 'fa fa-refresh');
  addIconToNavLink('.sidebar-nav a[href="crash.html"]', 'fa fa-trophy');
  addIconToNavLink('.sidebar-nav a[href="coinflip.html"]', 'fa fa-dollar');
  addIconToNavLink('.sidebar-nav a[href="dice.html"]', 'fa fa-cube');
  addIconToNavLink('.sidebar-nav a[href="unboxing.html"]', 'fa fa-box');
  addIconToNavLink('.sidebar-nav a[href="rewards.html"]', 'fa fa-star');
  addIconToNavLink('.sidebar-nav a[href="deposit.html"]', 'fa fa-money');
  addIconToNavLink('.sidebar-nav a[href="leaderboard.html"]', 'fa fa-trophy');
  addIconToNavLink('.sidebar-nav a[href="faq.html"]', 'fa fa-tag');

  // Mark active link based on current URL
  const currentPath = window.location.pathname;
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.endsWith(href)) {
      link.classList.add('active');
    }
  });
});