let isSpinning = false;

function startHandAnimation() {
    const hand = document.getElementById('hand');
    if (hand) {
        hand.classList.add('hand-animate'); // Start hand animation
    }
}

function spinRoulette() {
    if (isSpinning) return;
    isSpinning = true;
    const roulette = document.getElementById('roulette');
    const spinBtn = document.getElementById('spin-btn');
    spinBtn.style.pointerEvents = 'none';
    spinBtn.classList.remove('pulsating');
    
    // Random rotation
    const randomDegrees = Math.floor(Math.random() * (2880 - 1440 + 1)) + 1440;
    roulette.style.transform = `rotate(${randomDegrees}deg)`;

    setTimeout(() => {
        showEndcard();
    }, 4000); // Delay after roulette completes
}

function showEndcard() {
    const blackOverlay = document.getElementById('black-overlay');
    const ctaContainer = document.getElementById('cta-container');
    const downloadBtn = document.getElementById('download-btn');

    // Apply fade-in to black overlay
    blackOverlay.classList.add('fade-in-overlay');

    // Start the CTA scaling after the black overlay has faded in
    setTimeout(() => {
        ctaContainer.querySelector('#cta-img').classList.add('scale-up-cta');

        // Make the download button visible after the CTA has scaled in
        setTimeout(() => {
            downloadBtn.classList.add('visible-download');
            console.log("Download button is visible");
        }, 500); // Delay for CTA scaling
    }, 1000); // Delay for black overlay to appear first
}

document.addEventListener('DOMContentLoaded', () => {
    const spinBtn = document.getElementById('spin-btn');
    spinBtn.addEventListener('click', spinRoulette);
    spinBtn.addEventListener('touchstart', spinRoulette, { passive: true });

    startHandAnimation();
});
