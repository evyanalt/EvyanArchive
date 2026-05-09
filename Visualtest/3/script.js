const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drops = [];
const fontSize = 16;
const columns = canvas.width / fontSize;

// Initialize drops: one for each column
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawRain() {
    // This semi-transparent fill creates the trailing effect
    ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the color and font for the "rain"
    ctx.fillStyle = '#00f2ff'; // Cyber Blue
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        // Random character (or just a dot if you prefer)
        const text = "01"; 
        const char = text.charAt(Math.floor(Math.random() * text.length));
        
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after it hits the bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Run the animation
setInterval(drawRain, 33);

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});