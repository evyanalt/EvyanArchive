const canvas = document.getElementById('warpCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const numStars = 800; // Number of particles
let speed = 2; // Cruising speed
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

// The Star Class
class Star {
    constructor() {
        // Randomize 3D coordinates
        this.x = Math.random() * canvas.width * 2 - canvas.width;
        this.y = Math.random() * canvas.height * 2 - canvas.height;
        this.z = Math.random() * canvas.width; 
        this.pz = this.z; // Previous Z (used for drawing lines)
    }

    update() {
        this.z -= speed; // Move star closer
        
        // If star passes the screen, reset it far away
        if (this.z < 1) {
            this.x = Math.random() * canvas.width * 2 - canvas.width;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
            this.z = canvas.width;
            this.pz = this.z;
        }
    }

    draw() {
        // 3D to 2D projection math
        let sx = (this.x / this.z) * canvas.width + centerX;
        let sy = (this.y / this.z) * canvas.width + centerY;

        let px = (this.x / this.pz) * canvas.width + centerX;
        let py = (this.y / this.pz) * canvas.width + centerY;

        this.pz = this.z;

        // Make stars thicker and brighter as they get closer
        let size = (1 - this.z / canvas.width) * 3;
        let opacity = 1 - this.z / canvas.width;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = size;
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
    }
}

// Populate the galaxy
for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
}

// --- Interactions ---

// Steering the ship
window.addEventListener('mousemove', (e) => {
    centerX = e.clientX;
    centerY = e.clientY;
});

// Engaging Hyperdrive
window.addEventListener('mousedown', () => speed = 30);
window.addEventListener('mouseup', () => speed = 2);

// Touch support for mobile hyperdrive
window.addEventListener('touchstart', () => speed = 30);
window.addEventListener('touchend', () => speed = 2);

// Handle resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
});

// The Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    // Instead of clearRect, we draw a semi-transparent black box 
    // to give the stars a motion blur effect!
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });
}

animate();