// This script ensures proper sidebar and layout consistency across all pages
document.addEventListener("DOMContentLoaded", function() {
    // Function to check if page has proper sidebar structure
    function checkAndFixLayout() {
        const sidebar = document.querySelector('.sidebar');
        const mainPanel = document.querySelector('.main-panel');
        const wrapperPage = document.querySelector('.wrapper-page');
        
        // If this page is missing the wrapper-page structure, add it
        if (!wrapperPage) {
            console.log("Fixing missing wrapper structure");
            
            // Get the body content
            const bodyContent = document.body.innerHTML;
            
            // Create the proper structure
            const newStructure = `
                <div class="wrapper-page flex flex-row" id="page">
                    <!-- Sidebar -->
                    <div class="sidebar">
                        <div class="sidebar-logo">
                            <img src="/img/logo.png" alt="Betonu Logo">
                        </div>
                        <nav class="sidebar-nav">
                            <div class="sidebar-section">
                                <div class="sidebar-section-title">Main</div>
                                <ul>
                                    <li><a href="/index.htm"><i></i>Home</a></li>
                                    <li><a href="/casino/lobby.html"><i></i>Casino</a></li>
                                    <li><a href="/roulette.html"><i></i>Live</a></li>
                                </ul>
                            </div>
                            <div class="sidebar-section">
                                <div class="sidebar-section-title">Games</div>
                                <ul>
                                    <li><a href="/crash.html"><i></i>Sports</a></li>
                                    <li><a href="/coinflip.html"><i></i>Coinflip</a></li>
                                    <li><a href="/dice.html"><i></i>Dice</a></li>
                                    <li><a href="/unboxing.html"><i></i>Boxes</a></li>
                                </ul>
                            </div>
                            <div class="sidebar-section">
                                <div class="sidebar-section-title">Promo</div>
                                <ul>
                                    <li><a href="/rewards.html"><i></i>Rakeback</a></li>
                                    <li><a href="/deposit.html"><i></i>Free Bonus</a></li>
                                    <li><a href="/leaderboard.html"><i></i>VIP</a></li>
                                    <li><a href="/faq.html"><i></i>Codes</a></li>
                                </ul>
                            </div>
                        </nav>
                        <button class="sidebar-chat-toggle" data-modal="show" data-id="#modal_chat">
                            <i class="fa fa-comments"></i>
                        </button>
                    </div>
                    <!-- Sidebar Overlay for Mobile -->
                    <div class="sidebar-overlay" data-toggle="sidebar"></div>
                    <!-- Main Content -->
                    <div class="main-panel">
                        <div class="content-container">
                            ${bodyContent}
                        </div>
                    </div>
                </div>
            `;
            
            // Replace the body content with the new structure
            document.body.innerHTML = newStructure;
            
            // Re-run any necessary initialization scripts
            if (window.initSidebar) {
                window.initSidebar();
            }
        }
        
        // Set active link based on current page URL
        const currentPath = window.location.pathname;
        const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
        
        sidebarLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Remove leading slash for comparison
            const cleanHref = href.startsWith('/') ? href.substring(1) : href;
            const cleanCurrentPath = currentPath.startsWith('/') ? currentPath.substring(1) : currentPath;
            
            if (cleanCurrentPath.endsWith(cleanHref) || 
                (cleanHref === 'index.htm' && (cleanCurrentPath === '' || cleanCurrentPath === '/'))) {
                link.classList.add('active');
            }
        });
    }
    
    // Run the layout check
    setTimeout(checkAndFixLayout, 100);
});