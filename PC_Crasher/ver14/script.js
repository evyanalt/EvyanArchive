/** * THE 7900 "FINAL BOSS" 
 * Combining High-Intensity Math + VRAM Saturation
 */

const canvas = document.getElementById('surface');
const ctx = canvas.getContext('2d', { alpha: false });
const particles = [];
const ramSink = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- 1. THE RAM ANCHOR (Safe Saturation) ---
// We fill 10GB but keep it stable so the browser doesn't crash immediately
function fillRam() {
    for(let i=0; i<50; i++) {
        const buffer = new BigUint64Array(1000000); 
        for(let j=0; j<buffer.length; j++) buffer[j] = BigInt(j);
        ramSink.push(buffer);
    }
}
fillRam();

// --- 2. THE CPU BURNER (From CORE_MELTDOWN) ---
function burnCPU() {
    let x = 0;
    const start = performance.now();
    while(performance.now() - start < 15) { // Burn 15ms of every frame
        x += Math.sqrt(Math.random() * 100000);
    }
    setTimeout(burnCPU, 0);
}
burnCPU();

// --- 3. THE GPU TORCH (Particles + CSS Blending) ---
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 20;
        this.vy = (Math.random() - 0.5) * 20;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if(this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if(this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.shadowBlur = 50;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 100, 100); // Large rects = more fill rate stress
    }
}

for(let i=0; i<200; i++) particles.push(new Particle());

function render() {
    // We DON'T clear the rect perfectly, creating a GPU feedback smear
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Console Spam (Optional CPU hit)
    if(Math.random() > 0.9) console.table(particles.slice(0, 5));
    
    requestAnimationFrame(render);
}
render();

// --- 4. WINDOWS 98 TRIGGER (Title Flicker) ---
setInterval(() => {
    document.title = "⚠️ " + (Math.random() * 9999).toString(16) + " ⚠️";
}, 20);