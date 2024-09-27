let isSpinning = false;

function startHandAnimation() {
    const hand = document.getElementById('hand');
    if (hand) {
        hand.classList.add('hand-animate');
    }
}

function spinRoulette() {
    if (isSpinning) return;
    isSpinning = true;
    
    const roulette = document.getElementById('roulette');
    const spinBtn = document.getElementById('spin-btn');
    spinBtn.classList.remove('pulsating');
    spinBtn.style.pointerEvents = 'none';

    const randomDegrees = Math.floor(Math.random() * (2880 - 1440 + 1)) + 1440;
    roulette.style.transform = `rotate(${randomDegrees}deg)`;

    setTimeout(() => {
        showEndcard();
    }, 4000); // Time for spinning animation
}

function showEndcard() {
    const blackOverlay = document.getElementById('black-overlay');
    const ctaContainer = document.getElementById('cta-container');
    const downloadBtn = document.getElementById('download-btn');

    // Fade in the BLACK.png overlay
    blackOverlay.style.opacity = '0.8';

    setTimeout(() => {
        // Scale up the CTA image
        ctaContainer.querySelector('#cta-img').classList.add('scale-up-cta');

        // Check when the CTA has fully scaled in
        setTimeout(() => {
            console.log('CTA image should now be scaled up');
            // Proceed to make the download button visible once CTA is done scaling
            downloadBtn.classList.add('visible-download');
        }, 500); // CTA scale transition time
    }, 1000); // Wait 1 second for black overlay to fade in
}


document.addEventListener('DOMContentLoaded', () => {
    const spinBtn = document.getElementById('spin-btn');
    spinBtn.addEventListener('click', spinRoulette);
    spinBtn.addEventListener('touchstart', spinRoulette, { passive: true });

    startHandAnimation();
});
