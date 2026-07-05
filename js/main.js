/**
 * Unai Jewellers - Main UX Architecture Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigationScroll();
});

/**
 * Monitors scroll states to apply smooth luxury background pinning transitions 
 */
function initNavigationScroll() {
    const navbar = document.querySelector('.navbar-luxury');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}