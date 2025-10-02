// Ensures only CDN versions of FontAwesome are used
document.addEventListener('DOMContentLoaded', function() {
  // Define the URLs of the CDNs we want to use
  const cdnUrls = [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
    'https://use.fontawesome.com/releases/v5.15.4/css/all.css',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
  ];
  
  // Function to ensure CDN links exist in the document head
  function ensureFontAwesomeCDN() {
    cdnUrls.forEach(url => {
      if (!document.querySelector(`link[href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
        console.log('Added FontAwesome CDN:', url);
      }
    });
  }

  // Function to remove any local FontAwesome references
  function removeLocalFontAwesome() {
    // Remove any link tags that might be pointing to local FontAwesome
    document.querySelectorAll('link[href*="font-awesome"]').forEach(link => {
      if (!link.href.includes('cdnjs.cloudflare.com') && 
          !link.href.includes('use.fontawesome.com') && 
          !link.href.includes('maxcdn.bootstrapcdn.com')) {
        link.parentNode.removeChild(link);
        console.log('Removed local FontAwesome link:', link.href);
      }
    });
  }

  // Ensure we have the CDN links and remove local references
  ensureFontAwesomeCDN();
  removeLocalFontAwesome();
});