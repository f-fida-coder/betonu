// Ensure logo is properly displayed
document.addEventListener('DOMContentLoaded', function() {
  // Force logo visibility
  const sidebarLogo = document.querySelector('.sidebar-logo');
  if (sidebarLogo) {
    sidebarLogo.style.display = 'block';
    sidebarLogo.style.visibility = 'visible';
    sidebarLogo.style.opacity = '1';
    
    // Check if logo image exists
    const logoImg = sidebarLogo.querySelector('img');
    if (!logoImg || logoImg.naturalWidth === 0) {
      console.warn('Logo image missing or not loaded, attempting to fix...');
      
      // Remove any existing image
      if (logoImg) logoImg.remove();
      
      // Create new logo image
      const newLogoImg = document.createElement('img');
      newLogoImg.src = 'img/logo.png';
      newLogoImg.alt = 'Betonu Logo';
      newLogoImg.style.display = 'block';
      newLogoImg.style.height = '80px';
      newLogoImg.style.margin = '0 auto';
      newLogoImg.style.visibility = 'visible';
      newLogoImg.style.opacity = '1';
      
      // Add to logo container
      sidebarLogo.appendChild(newLogoImg);
    }
  } else {
    console.error('Sidebar logo container not found');
  }
});