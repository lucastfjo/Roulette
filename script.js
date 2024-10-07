let isSpinning = false;

// Define gift card images with correct paths
const giftCards = [
    "giftCard1.png",
    "giftCard2.png",
    "giftCard3.png",
    "giftCard4.png",
    "giftCard5.png",
    "giftCard6.png",
    "giftCard7.png",
    "giftCard8.png"
];

// Function to determine which gift card to display
function getSelectedGiftCard(finalDegrees) {
    const normalizedDegrees = finalDegrees % 360; 
    const sectionIndex = Math.floor(normalizedDegrees / 45);
    return giftCards[sectionIndex];
}

function spinRoulette() {
    if (isSpinning) return;

    isSpinning = true;
    const roulette = document.getElementById('roulette');
    const spinBtn = document.getElementById('spin-btn');
    const hand = document.getElementById('hand');

    spinBtn.classList.remove('pulsating');
    spinBtn.style.pointerEvents = 'none';
    hand.style.display = 'none';

    const randomDegrees = Math.floor(Math.random() * (2880 - 1440 + 1)) + 1440;
    roulette.style.transform = `rotate(${randomDegrees}deg)`;

    const spinTime = 2000; 
    const extraTime = 1000; 

    setTimeout(() => {
        showEndcard(randomDegrees);
    }, spinTime + extraTime);
}

function showEndcard(finalDegrees) {
    const blackOverlay = document.getElementById('black-overlay');
    const ctaContainer = document.getElementById('cta-container');
    const downloadBtn = document.getElementById('download-btn');
    const hand = document.getElementById('hand');

    blackOverlay.style.opacity = '0.8';
    const selectedGiftCard = getSelectedGiftCard(finalDegrees);

    const giftCardImage = document.createElement("img");
    giftCardImage.src = selectedGiftCard;
    giftCardImage.style.position = "absolute";
    giftCardImage.style.top = "50%"; 
    giftCardImage.style.left = "50%"; 
    giftCardImage.style.transform = "translate(-50%, -50%)"; 
    giftCardImage.style.zIndex = "101"; 
    document.body.appendChild(giftCardImage); 

    setTimeout(() => {
        document.body.removeChild(giftCardImage); 
        ctaContainer.querySelector('#cta-img').classList.add('scale-up-cta');
        downloadBtn.style.display = 'block'; 
        downloadBtn.classList.add('pulsating-download'); 
        downloadBtn.style.pointerEvents = 'auto'; 

        hand.style.display = 'block'; 
        hand.classList.remove('pulsating-hand'); 
        hand.style.zIndex = '104'; 

        smoothSlide(hand, -200, -70, 500); 
    }, 2000); 
}

function smoothSlide(element, startY, endY, duration) {
    const startTime = performance.now();

    function animate(time) {
        const elapsedTime = time - startTime; 
        const t = Math.min(elapsedTime / duration, 1); 
        
        const currentY = startY + (endY - startY) * t; 

        element.style.bottom = currentY + 'px'; 

        if (t < 1) {
            requestAnimationFrame(animate); 
        } else {
            element.classList.add('bouncing');
        }
    }

    requestAnimationFrame(animate); 
}

function startHandAnimation() {
    const hand = document.getElementById('hand');
    if (hand) {
        hand.classList.add('pulsating-hand'); 
    }
}

function setupEventListeners() {
    const spinBtn = document.getElementById('spin-btn');
    spinBtn.addEventListener('click', spinRoulette);
    spinBtn.addEventListener('touchstart', spinRoulette, { passive: true });
    startHandAnimation();
}

document.addEventListener('DOMContentLoaded', setupEventListeners);
