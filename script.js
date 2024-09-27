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

    // After 2 seconds of spinning, leave the result visible for 2 seconds before showing the endcard
    setTimeout(() => {
        setTimeout(() => {
            showEndcard();
        }, 2000); // 2-second delay after spinning stops
    }, 2000); // 2-second spinning time
}

function showEndcard() {
    const blackOverlay = document.getElementById('black-overlay');
    const ctaContainer = document.getElementById('cta-container');
    const downloadBtn = document.getElementById('download-btn');

    // Fade in the BLACK.png overlay to 80% opacity
    blackOverlay.style.opacity = '0.8';

    // Scale up the CTA image after the black overlay fades in
    setTimeout(() => {
        ctaContainer.querySelector('#cta-img').classList.add('scale-up-cta');

        // After CTA has finished scaling up (0.5s), show the download button
        setTimeout(() => {
            downloadBtn.classList.add('fade-in-download'); // Fade in the download button
        }, 500); // Wait 0.5 seconds for the CTA to fully scale
    }, 1000); // Wait 1 second for the black overlay to fade in
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
