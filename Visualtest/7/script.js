const canvas = document.getElementById('spiralCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- CONFIGURATION ---
const numParticles = 3000;  // More particles = denser vortex
let angleOffset = 0;        // Base speed/rotation
let colorOffset = 0;        // Controls the color spectrum cycle

// A class to manage each particle on the spiral
class Particle {
    constructor(index) {
        this.index = index;
        // The core spiral equation variables:
        // We link these to the particle's index to spiral them outward
        this.baseAngle = this.index * 0.1; // Rotational velocity
        this.b = 0.3; // How tightly the spiral is wound
        this.growth = Math.exp(this.b * this.baseAngle) * 0.1; // Radial velocity

        this.x = 0;
        this.y = 0;
        this.size = 2; // Fixed particle size
    }

    update() {
        // Here we combine the base spiral position with the dynamic animation:
        // 1. Math.sin(angleOffset + this.index) creates a 'breathing' wave effect
        // 2. We add this wave to the exponential growth (this.growth)
        const radius = this.growth + 20 * Math.sin(angleOffset + this.index * 0.05);

        // Standard polar (angle) coordinates to Cartesian (X,Y) conversion
        this.x = canvas.width / 2 + Math.cos(this.baseAngle + angleOffset * 0.5) * radius;
        this.y = canvas.height / 2 + Math.sin(this.baseAngle + angleOffset * 0.5) * radius;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        // DYNAMIC COLOR SPECTRUM
        // Based on Golden Ratio / Golden Angle principle
        const colorFactor = (this.index * 137.5 + colorOffset) % 360; 
        ctx.fillStyle = `hsla(${colorFactor}, 90%, 65%, 0.8)`;
        ctx.fill();
    }
}

// Populate the system
let particles = [];
for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(i));
}

// The core animation loop
function animate() {
    requestAnimationFrame(animate);

    // This is crucial: instead of clearing, we fade.
    // rgba(5, 5, 10, 0.05) creates the smooth 'ghosting' trailing effect.
    ctx.fillStyle = 'rgba(5, 5, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw every particle
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Advance the time/color counters
    angleOffset += 0.02;  // Controls animation speed (breathing/rotation)
    colorOffset += 0.5;   // Controls how fast the colors shift
}

animate();

// --- Responsive Canvas ---
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // We don't re-initialize particles; they will adapt to the new size.
});