let isSpinning = false;

function spinRoulette() {
    if (isSpinning) return;

    isSpinning = true;
    const roulette = document.getElementById('roulette');
    const spinBtn = document.getElementById('spin-btn');

    // Disable the spin button
    spinBtn.style.pointerEvents = 'none';

    // Random angle between 1440 to 2880 degrees (4 to 8 full spins)
    const randomDegrees = Math.floor(Math.random() * (2880 - 1440 + 1)) + 1440;

    // Start rotating the roulette
    roulette.style.transform = `rotate(${randomDegrees}deg)`;

    // After 2 seconds of spinning, leave the result visible for 2 seconds before showing the end card
    setTimeout(() => {
        setTimeout(() => {
            showEndcard();
        }, 2000); // 2-second delay after spinning stops
    }, 2000); // 2-second spinning time
}

function showEndcard() {
    const endcard = document.getElementById('endcard');
    const spinBtn = document.getElementById('spin-btn');
    const downloadBtn = document.getElementById('download-btn');

    // Hide spin button and show endcard and download button
    spinBtn.style.display = 'none';
    endcard.style.display = 'flex';
    downloadBtn.style.display = 'block';
}

// Add event listeners for both mouse click and touch
function setupEventListeners() {
    const spinBtn = document.getElementById('spin-btn');

    // For desktop click
    spinBtn.addEventListener('click', spinRoulette);

    // For touch devices
    spinBtn.addEventListener('touchstart', spinRoulette, { passive: true });
}

// Ensure the DOM is fully loaded before setting up event listeners
document.addEventListener('DOMContentLoaded', setupEventListeners);

//gitcommitairport