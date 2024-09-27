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
    const randomDegrees = Math.floor(Math.random() * (2880 - 1440 + 1)) + 1440;
    roulette.style.transform = `rotate(${randomDegrees}deg)`;
    setTimeout(() => {
        showEndcard();
    }, 4000); // After roulette animation
}

function showEndcard() {
    const blackOverlay = document.getElementById('black-overlay');
    const ctaContainer = document.getElementById('cta-container');
    const downloadBtn = document.getElementById('download-btn');

    blackOverlay.style.opacity = '0.8'; // Fade in the black overlay

    setTimeout(() => {
        ctaContainer.querySelector('#cta-img').classList.add('scale-up-cta');
        setTimeout(() => {
            downloadBtn.classList.add('visible-download'); // Make download button visible
        }, 500); // Delay to ensure it appears after CTA is visible
    }, 1000); // Start after black overlay fades in
}

document.addEventListener('DOMContentLoaded', () => {
    const spinBtn = document.getElementById('spin-btn');
    spinBtn.addEventListener('click', spinRoulette);
    spinBtn.addEventListener('touchstart', spinRoulette, { passive: true });
    startHandAnimation();
});
