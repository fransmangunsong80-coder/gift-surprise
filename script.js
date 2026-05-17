// Gift Box Surprise Logic
const giftBox = document.getElementById('giftBox');
const clickCounter = document.getElementById('clickCounter');
const surpriseTextContainer = document.getElementById('surpriseText');
const confettiContainer = document.getElementById('confettiContainer');
const fireContainer = document.getElementById('fireContainer');

let clickCount = 0;
const MAX_CLICKS = 5;
const SURPRISE_TEXT = 'JANGAN LUPA API BUUU';

// Sound effect URLs (optional - using Web Audio API for beep)
function playClickSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 400;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Click on gift box
giftBox.addEventListener('click', () => {
    if (clickCount < MAX_CLICKS) {
        clickCount++;
        playClickSound();
        
        // Shake animation
        giftBox.classList.remove('clicked');
        void giftBox.offsetWidth; // Trigger reflow
        giftBox.classList.add('clicked');
        
        // Update counter
        clickCounter.textContent = `Klik: ${clickCount}/${MAX_CLICKS}`;
        
        // Trigger surprise at max clicks
        if (clickCount === MAX_CLICKS) {
            setTimeout(triggerSurprise, 500);
        }
    }
});

function triggerSurprise() {
    // Create surprise text with animation
    createSurpriseText();
    
    // Create confetti
    createConfetti();
    
    // Create fire effect
    createFire();
    
    // Reset after animation
    setTimeout(() => {
        resetGiftBox();
    }, 3000);
}

function createSurpriseText() {
    surpriseTextContainer.innerHTML = '';
    
    SURPRISE_TEXT.split('').forEach((letter, index) => {
        const letterElement = document.createElement('div');
        letterElement.className = 'surprise-letter';
        letterElement.textContent = letter;
        letterElement.style.left = (index - SURPRISE_TEXT.length / 2) * 40 + 'px';
        letterElement.style.animationDelay = index * 0.1 + 's';
        
        surpriseTextContainer.appendChild(letterElement);
    });
}

function createConfetti() {
    const colors = ['#FFD700', '#FF6B6B', '#4CAF50', '#667eea', '#FF1493', '#00CED1'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.opacity = Math.random() * 0.7 + 0.3;
        confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
        
        confettiContainer.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

function createFire() {
    const fireCount = 15;
    
    for (let i = 0; i < fireCount; i++) {
        const fire = document.createElement('div');
        fire.className = 'fire';
        fire.style.left = Math.random() * 120 - 30 + 'px';
        fire.style.width = Math.random() * 40 + 20 + 'px';
        fire.style.height = Math.random() * 60 + 40 + 'px';
        fire.style.animationDelay = Math.random() * 0.5 + 's';
        
        // Vary fire colors
        const hue = Math.random() * 60; // Red to Orange
        fire.style.background = `radial-gradient(ellipse at center, hsl(${hue}, 100%, 60%) 0%, hsl(${hue - 20}, 100%, 50%) 50%, hsl(${hue - 40}, 100%, 40%) 100%)`;
        
        fireContainer.appendChild(fire);
        
        // Remove after animation
        setTimeout(() => {
            fire.remove();
        }, 2000);
    }
}

function resetGiftBox() {
    clickCount = 0;
    giftBox.classList.remove('clicked');
    clickCounter.textContent = 'Klik: 0/5';
}

// Initial message
console.log('%c🎁 GIFT SURPRISE 🎁', 'font-size: 20px; color: red; font-weight: bold;');
console.log('%cKlik kotak hadiah sebanyak 4-5 kali untuk surprise! 🎉', 'font-size: 14px; color: blue;');
