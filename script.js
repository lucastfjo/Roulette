let isSpinning = false;

// Step 1: Define gift card images with correct paths
const giftCards = [
    "giftCard1.png", // corresponds to section 1
    "giftCard2.png", // corresponds to section 2
    "giftCard3.png", // corresponds to section 3
    "giftCard4.png", // corresponds to section 4
    "giftCard5.png", // corresponds to section 5
    "giftCard6.png", // corresponds to section 6
    "giftCard7.png", // corresponds to section 7
    "giftCard8.png"  // corresponds to section 8
];

// Function to determine which gift card to display
function getSelectedGiftCard(finalDegrees) {
    const normalizedDegrees = finalDegrees % 360; // Normalize to 0-359 degrees
    const sectionIndex = Math.floor(normalizedDegrees / 45); // Each section is 45 degrees
    return giftCards[sectionIndex]; // Return the corresponding gift card image
}

function spinRoulette() {
    if (isSpinning) return;

    isSpinning = true;
    const roulette = document.getElementById('roulette');
    const spinBtn = document.getElementById('spin-btn');
    const hand = document.getElementById('hand'); // Get the hand element

    // Disable spin button to prevent multiple clicks
    spinBtn.classList.remove('pulsating');
    spinBtn.style.pointerEvents = 'none';

    // Make the hand image disappear instantly
    hand.style.display = 'none'; // Set display to none to hide it

    // Random angle for roulette
    const randomDegrees = Math.floor(Math.random() * (2880 - 1440 + 1)) + 1440;
    roulette.style.transform = `rotate(${randomDegrees}deg)`;

    const spinTime = 2000; // Duration of spinning
    const extraTime = 1000; // Extra time before showing the gift card

    // After the spinning time plus extra time, show the gift card
    setTimeout(() => {
        // Call showEndcard with the finalDegrees calculated earlier
        showEndcard(randomDegrees); // Pass randomDegrees as final angle
    }, spinTime + extraTime); // Total delay
}


function smoothSlide(element, startY, endY, duration) {
    const startTime = performance.now(); // Record the start time

    function animate(time) {
        const elapsedTime = time - startTime; // Calculate elapsed time
        const t = Math.min(elapsedTime / duration, 1); // Normalize to [0, 1]
        
        // Lerp function to calculate the current Y position
        const currentY = startY + (endY - startY) * t; // Linear interpolation

        element.style.bottom = currentY + 'px'; // Update the position

        if (t < 1) {
            requestAnimationFrame(animate); // Continue animation until t reaches 1
        }
    }

    requestAnimationFrame(animate); // Start the animation
}

function showEndcard(finalDegrees) { // Accept finalDegrees as a parameter
    const blackOverlay = document.getElementById('black-overlay');
    const ctaContainer = document.getElementById('cta-container');
    const downloadBtn = document.getElementById('download-btn');
    const hand = document.getElementById('hand'); // Get the hand element

    // Fade in the BLACK.png overlay to 80% opacity
    blackOverlay.style.opacity = '0.8';

    // Get selected gift card based on finalDegrees
    const selectedGiftCard = getSelectedGiftCard(finalDegrees);

    // Step 2: Display the selected gift card
    const giftCardImage = document.createElement("img");
    giftCardImage.src = selectedGiftCard; // Set the image source
    giftCardImage.style.position = "absolute";
    giftCardImage.style.top = "50%"; // Center it vertically
    giftCardImage.style.left = "50%"; // Center it horizontally
    giftCardImage.style.transform = "translate(-50%, -50%)"; // Center align
    giftCardImage.style.zIndex = "101"; // Ensure it's above other elements
    document.body.appendChild(giftCardImage); // Append to body or a specific container

    // Step 3: Set a timer to remove the gift card image and show the CTA and download button
    setTimeout(() => {
        document.body.removeChild(giftCardImage); // Remove the gift card image

        // Show the CTA
        ctaContainer.querySelector('#cta-img').classList.add('scale-up-cta'); // Show CTA

        // Show the download button
        downloadBtn.style.display = 'block'; // Make it visible
        downloadBtn.classList.add('pulsating-download'); // Add pulsating effect
        downloadBtn.style.pointerEvents = 'auto'; // Enable interaction

        // Show HAND.png, remove pulsating class, set its z-index
        hand.style.display = 'block'; // Make HAND visible
        hand.classList.remove('pulsating-hand'); // Remove pulsating animation class
        hand.style.zIndex = '104'; // Ensure HAND is on top of DOWNLOAD.png
        
        // Animate HAND sliding up smoothly
        smoothSlide(hand, -200, -70, 500); // Start from -50px to 40px over 500ms
    }, 2000); // Display the gift card for 2 seconds
}


function startHandAnimation() {
    const hand = document.getElementById('hand');
    if (hand) {
        hand.classList.add('pulsating-hand'); // Add the pulsating animation class
    }
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
