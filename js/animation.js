/**
 * UNAI JEWELLERS - GLOBAL INTERACTIONS & QUICKVIEW CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
    initCookieConsent();
});

/**
 * Handles Privacy Management Banner Visibility Metrics
 */
function initCookieConsent() {
    const banner = document.getElementById('cookiePrivacyBanner');
    const acceptBtn = document.getElementById('acceptCookiesBtn');
    
    if (!banner || !acceptBtn) return;

    // Show banner after a slight delay if not previously acknowledged
    if (!localStorage.getItem('unai_privacy_acknowledged')) {
        setTimeout(() => {
            banner.classList.add('active');
        }, 2000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('unai_privacy_acknowledged', 'true');
        banner.classList.remove('active');
    });
}

/**
 * Dynamic Modal Interface Mapper
 * Populates and opens the premium selection modal using the data layer from Phase 2
 */
function openProductQuickView(productId) {
    // Locate target data within your global inventory matrix (loaded via js/jewellery.js)
    const item = JEWELLERY_INVENTORY.find(p => p.id === productId);
    if (!item) return;

    // Calculate live dynamic metrics 
    const finalPrice = calculateJewelleryPrice(item.purity, item.weight, item.makingCharges);
    const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(finalPrice);

    // Map content nodes directly into active layout nodes safely
    document.getElementById('modalProductImage').style.backgroundImage = `url('${item.primaryImage}')`;
    document.getElementById('modalProductCategory').innerText = `${item.category} • ${item.subCategory}`;
    document.getElementById('modalProductTitle').innerText = item.name;
    document.getElementById('modalProductDescription').innerText = item.description;
    document.getElementById('modalProductWeight').innerText = `${item.weight.toFixed(2)}g`;
    document.getElementById('modalProductPurity').innerText = `${item.purity} Hallmark Standard`;
    document.getElementById('modalProductPrice').innerText = `${formattedPrice} *`;

    // Configure clean WhatsApp route mapping parameters
    const whatsappText = `Hello Unai Jewellers, I am viewing your online catalogue and would like to inquire about availability and finalizing calculations for "${item.name}" (Ref: ${item.id}, Purity: ${item.purity}, Weight: ${item.weight}g).`;
    document.getElementById('modalWhatsAppBtn').href = `https://wa.me/919999999999?text=${encodeURIComponent(whatsappText)}`;

    // Bootstrap native trigger call activation
    const quickViewModal = new bootstrap.Modal(document.getElementById('productQuickViewModal'));
    quickViewModal.show();
}