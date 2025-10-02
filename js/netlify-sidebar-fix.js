// Ensure proper FontAwesome icon loading and sidebar enhancement for Netlify
document.addEventListener('DOMContentLoaded', function() {
  // Add FontAwesome icons to menu items using JavaScript (more reliable than CSS)
  const addIconToNavLink = (selector, iconClass) => {
    const link = document.querySelector(selector);
    if (link) {
      const icon = link.querySelector('i');
      if (icon) {
        icon.className = iconClass;
      }
    }
  };

  // Apply FontAwesome icons to all nav items
  addIconToNavLink('.sidebar-nav a[href="index.htm"] i', 'fa fa-home');
  addIconToNavLink('.sidebar-nav a[href="casino/lobby.html"] i', 'fa fa-globe');
  addIconToNavLink('.sidebar-nav a[href="roulette.html"] i', 'fa fa-refresh');
  addIconToNavLink('.sidebar-nav a[href="crash.html"] i', 'fa fa-trophy');
  addIconToNavLink('.sidebar-nav a[href="coinflip.html"] i', 'fa fa-dollar');
  addIconToNavLink('.sidebar-nav a[href="dice.html"] i', 'fa fa-cube');
  addIconToNavLink('.sidebar-nav a[href="unboxing.html"] i', 'fa fa-box');
  addIconToNavLink('.sidebar-nav a[href="rewards.html"] i', 'fa fa-star');
  addIconToNavLink('.sidebar-nav a[href="deposit.html"] i', 'fa fa-money');
  addIconToNavLink('.sidebar-nav a[href="leaderboard.html"] i', 'fa fa-trophy');
  addIconToNavLink('.sidebar-nav a[href="faq.html"] i', 'fa fa-tag');

  // Mark active link based on current URL
  const currentPath = window.location.pathname;
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.endsWith(href)) {
      link.classList.add('active');
    }
  });
});