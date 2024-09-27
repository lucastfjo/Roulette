let isSpinning = false;

function startHandAnimation() {
    const hand = document.getElementById('hand');
    if (hand) {
        hand.classList.add('hand-animate'); // Trigger hand animation
    }
}

function spinRoulette() {
    if (isSpinning) return;

    isSpinning = true;
    const roulette = document.getElementById('roulette');
    const spinBtn = document.getElementById('spin-btn');

    // Disable spin button to prevent multiple clicks
    spinBtn.classList.remove('pulsating');
    spinBtn.style.pointerEvents = 'none';

    // Random angle for roulette
    const randomDegrees = Math.floor(Math.random() * (2880 - 1440 + 1)) + 1440;
    roulette.style.transform = `rotate(${randomDegrees}deg)`;

    // After 2 seconds of spinning, leave the result visible for 1 second before showing the black overlay
    setTimeout(() => {
        showBlackOverlay(); // Show the black overlay after 1 second
    }, 2000); // 2-second spinning time
}

function showBlackOverlay() {
    const blackOverlay = document.getElementById('black-overlay');
    
    // Ensure black overlay exists
    if (blackOverlay) {
        console.log("Adding fade-in-overlay class to black overlay.");
        blackOverlay.classList.add('fade-in-overlay'); // Fade in to 80% opacity
    } else {
        console.log("Black overlay not found!");
    }

    // After the black overlay has faded in, scale up the CTA
    setTimeout(() => {
        showCTA();
    }, 500); // Wait 0.5 seconds for the black overlay to fade in
}

function showCTA() {
    const ctaContainer = document.getElementById('cta-container');
    const downloadBtn = document.getElementById('download-btn');

    // Ensure the CTA container exists
    if (ctaContainer) {
        ctaContainer.querySelector('#cta-img').classList.add('scale-up-cta');
    } else {
        console.log("CTA container not found!");
    }

    // After the CTA has finished scaling up, show the download button
    setTimeout(() => {
        if (downloadBtn) {
            downloadBtn.classList.add('fade-in-download'); // Fade in the download button
        } else {
            console.log("Download button not found!");
        }
    }, 500); // Wait 0.5 seconds for the CTA to fully scale
}

function setupEventListeners() {
    const spinBtn = document.getElementById('spin-btn');

    // For desktop click
    spinBtn.addEventListener('click', spinRoulette);

    // For touch devices
    spinBtn.addEventListener('touchstart', spinRoulette, { passive: true });

    // Start the hand animation on page load
    startHandAnimation();
}

// Ensure the DOM is fully loaded before setting up event listeners
document.addEventListener('DOMContentLoaded', setupEventListeners);
