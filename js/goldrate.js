/**
 * UNAI JEWELLERS - LIVE COMMODITY PRICE ENGINE
 * * Rates are configured per 1 Gram.
 * Centralized pricing system allowing seamless API integration later.
 */

const LIVE_COMMODITY_RATES = {
    GOLD_22K: 7250,  // INR per Gram
    GOLD_18K: 5930,  // INR per Gram
    SILVER_925: 95   // INR per Gram
};

/**
 * Calculates the total estimated price of a jewellery item dynamically.
 * Formula: (Live Rate * Weight) + Making Charges
 */
function calculateJewelleryPrice(purity, weight, makingCharges = 0) {
    let ratePerGram = 0;

    switch (purity.toUpperCase()) {
        case '22K':
            ratePerGram = LIVE_COMMODITY_RATES.GOLD_22K;
            break;
        case '18K':
            ratePerGram = LIVE_COMMODITY_RATES.GOLD_18K;
            break;
        case 'SILVER 925':
        case 'SILVER':
            ratePerGram = LIVE_COMMODITY_RATES.SILVER_925;
            break;
        default:
            ratePerGram = 0;
    }

    const baseMaterialPrice = ratePerGram * weight;
    const finalEstimatedPrice = baseMaterialPrice + makingCharges;
    
    return Math.round(finalEstimatedPrice);
}
/**
 * UI Ticker Renderer - Injecting rate states safely into structural DOM selectors
 */
function updateLiveRateTickers() {
    const gold22Node = document.getElementById('tickerGold22');
    const gold18Node = document.getElementById('tickerGold18');
    const silverNode = document.getElementById('tickerSilver');

    const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

    if (gold22Node) gold22Node.innerText = formatter.format(LIVE_COMMODITY_RATES.GOLD_22K * 10);
    if (gold18Node) gold18Node.innerText = formatter.format(LIVE_COMMODITY_RATES.GOLD_18K * 10);
    if (silverNode) silverNode.innerText = formatter.format(LIVE_COMMODITY_RATES.SILVER_925 * 1000);
}

// Automatically trigger processing updates on document lifecycle mount
document.addEventListener('DOMContentLoaded', updateLiveRateTickers);