/** * PROTOCOL: PARTICLE_STORM_V2
 * Strategy: Fill-Rate Exhaustion + Thread Thrashing
 */

const canvas = document.getElementById('storm');
const ctx = canvas.getContext('2d', { alpha: false });
const particles = [];
const ramSink = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- 1. THE STABLE RAM BURDEN ---
// Filling memory to the 90% "sweet spot" without crashing
for (let i = 0; i < 60; i++) {
    ramSink.push(new Float64Array(1000000).fill(Math.random()));
}

// --- 2. THE STUNNING VISUALS (GPU KILLER) ---
class FlashParticle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 150 + 50;
        this.speedX = (Math.random() - 0.5) * 50;
        this.speedY = (Math.random() - 0.5) * 50;
        this.hue = Math.random() * 360;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.hue += 10;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }
    draw() {
        // Create a radial gradient for every particle = MASSIVE GPU overhead
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        grad.addColorStop(0, `hsla(${this.hue}, 100%, 50%, 1)`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    }
}

// Spawning 1000 particles. Each one is a complex gradient.
for (let i = 0; i < 1000; i++) {
    particles.push(new FlashParticle());
}

function speedrun() {
    // DO NOT CLEAR THE FULL SCREEN - Let the colors stack and "burn"
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Intense Hue Rotation on the whole canvas via CSS
    canvas.style.filter = `hue-rotate(${Date.now() % 360}deg) contrast(200%)`;

    requestAnimationFrame(speedrun);
}

// --- 3. THE CPU "HEATER" ---
// Runs in parallel to keep that i7 at 80%+
setInterval(() => {
    let x = 0;
    for (let i = 0; i < 5000000; i++) {
        x += Math.atan(i) * Math.tan(i);
    }
}, 10);

speedrun();

console.log("%c ⚡ EPILEPSY SPEEDRUN INITIALIZED ⚡ ", "background: red; color: white; font-size: 30px;");